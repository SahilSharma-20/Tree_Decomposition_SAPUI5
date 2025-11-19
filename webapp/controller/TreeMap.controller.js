sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "tmt/treemap/model/Data"
], function (Controller, Data) {
    "use strict";

    return Controller.extend("tmt.treemap.controller.TreeMap", {

        onAfterRendering: function () {
            const container = document.getElementById("d3DecompTree");
            if (!container) {
                console.error("Decomposition Tree container not found.");
                return;
            }
            container.innerHTML = "";

            const data = Data.getTreeData();
            const width = container.clientWidth || 960;
            const height = container.clientHeight || 600;
            const margin = { top: 20, right: 120, bottom: 20, left: 120 };

            const svg = d3.select(container).append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom()
                    .scaleExtent([0.5, 3])
                    .on("zoom", zoomed))
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            function zoomed(event) {
                svg.attr("transform", event.transform);
            }

            let i = 0,
                duration = 750,
                root;

            const treemap = d3.tree()
                .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

            root = d3.hierarchy(data, d => d.children);
            root.x0 = (height - margin.top - margin.bottom) / 2;
            root.y0 = 0;

            root.children.forEach(collapse);
            update(root);

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            function update(source) {
                let treeData = treemap(root);
                let nodes = treeData.descendants(),
                    links = treeData.descendants().slice(1);

                nodes.forEach(d => d.y = d.depth * 180);

                // **************** Nodes section ***************************
                let node = svg.selectAll('g.node')
                    .data(nodes, d => d.id || (d.id = ++i));

                let nodeEnter = node.enter().append('g')
                    .attr('class', 'node')
                    .attr("transform", d => `translate(${source.y0},${source.x0})`)
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
                    .on('click', (event, d) => {
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null;
                        }
                        update(d);
                    });

                nodeEnter.append('circle')
                    .attr('class', 'node')
                    .attr('r', 1e-6)
                    .style("fill", d => d._children ? "#ffb347" : "#d94f70")
                    .style("cursor", "pointer");

                nodeEnter.append('text')
                    .attr("dy", ".35em")
                    .attr("x", d => d.children || d._children ? -13 : 13)
                    .attr("text-anchor", d => d.children || d._children ? "end" : "start")
                    .text(d => d.data.name)
                    .style("user-select", "none");

                nodeEnter.append('text')
                    .attr('class', 'plus-button')
                    .attr('x', 20)
                    .attr('y', -10)
                    .attr('font-size', '16px')
                    .attr('cursor', 'pointer')
                    .text('+')
                    .on('click', (event, d) => {
                        event.stopPropagation();
                        toggleCard(d, d3.select(event.currentTarget.parentNode));
                    });

                let nodeUpdate = nodeEnter.merge(node);

                nodeUpdate.transition()
                    .duration(duration)
                    .attr("transform", d => `translate(${d.y},${d.x})`);

                nodeUpdate.select('circle.node')
                    .attr('r', 8)
                    .style("fill", d => d._children ? "#ffb347" : "#d94f70")
                    .attr('cursor', 'pointer');

                let nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", d => `translate(${source.y},${source.x})`)
                    .remove();

                nodeExit.select('circle')
                    .attr('r', 1e-6);

                nodeExit.select('text')
                    .style('fill-opacity', 1e-6);

                // **************** Links section ***************************
                let link = svg.selectAll('path.link')
                    .data(links, d => d.id);

                let linkEnter = link.enter().insert('path', "g")
                    .attr("class", "link")
                    .attr('d', d => {
                        let o = { x: source.x0, y: source.y0 };
                        return diagonal(o, o);
                    })
                    .style("fill", "none")
                    .style("stroke", "#ccc")
                    .style("stroke-width", "2px");

                let linkUpdate = linkEnter.merge(link);

                linkUpdate.transition()
                    .duration(duration)
                    .attr('d', d => diagonal(d, d.parent));

                let linkExit = link.exit().transition()
                    .duration(duration)
                    .attr('d', d => {
                        let o = { x: source.x, y: source.y };
                        return diagonal(o, o);
                    })
                    .remove();

                nodes.forEach(d => {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });

                function diagonal(s, d) {
                    return `M ${s.y} ${s.x}
                            C ${(s.y + d.y) / 2} ${s.x},
                              ${(s.y + d.y) / 2} ${d.x},
                              ${d.y} ${d.x}`;
                }

                function dragstarted(event, d) {
                    d3.select(this).raise().classed("active", true);
                }
                function dragged(event, d) {
                    d.x = event.y;
                    d.y = event.x;
                    d3.select(this).attr("transform", `translate(${d.y},${d.x})`);
                    update(d);
                }
                function dragended(event, d) {
                    d3.select(this).classed("active", false);
                }

                // **************** Card function with dynamic positioning ****************
                function toggleCard(d, nodeGroup) {
                    const existing = nodeGroup.select('g.detail-card');
                    if (!existing.empty()) {
                        existing.remove();
                        nodeGroup.select('.plus-button').text('+');
                        return;
                    }

                    nodeGroup.select('.plus-button').text('−');

                    const cardWidth = 220, cardHeight = 90;
                    let xOffset = 30; // default right
                    let yOffset = 20; // below node

                    // Adjust horizontal positioning
                    if (d.y + cardWidth + margin.left > width) {
                        xOffset = -cardWidth - 20; // show left
                    }

                    // Adjust vertical positioning
                    if (d.x + cardHeight + margin.top > height) {
                        yOffset = -(cardHeight + 10); // shift above
                    }

                    const card = nodeGroup.append('g')
                        .attr('class', 'detail-card')
                        .attr('transform', `translate(${xOffset},${yOffset})`);

                    card.append('rect')
                        .attr('width', cardWidth)
                        .attr('height', cardHeight)
                        .attr('rx', 6)
                        .attr('ry', 6)
                        .style('fill', '#f9f9f9')
                        .style('stroke', '#999')
                        .style('stroke-width', '1.5px')
                        .style('filter', 'drop-shadow(2px 2px 4px #aaa)');

                    const details = d.data.details || {};
                    const lines = [
                        `Plant: ${details.plant || '-'}`,
                        `Material Name: ${details.materialName || '-'}`,
                        `Material Code: ${details.materialCode || '-'}`,
                        `Consignment Date: ${details.consignmentDate || '-'}`
                    ];

                    card.selectAll('text')
                        .data(lines)
                        .enter()
                        .append('text')
                        .attr('x', 10)
                        .attr('y', (line, i) => 20 + i * 18)
                        .text(line => line)
                        .attr('font-size', '12px')
                        .attr('fill', '#333')
                        .style('font-family', 'Arial, sans-serif');
                }
            }
        }
    });
});
