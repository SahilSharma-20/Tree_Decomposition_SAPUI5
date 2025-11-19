sap.ui.define([], function () {
    "use strict";

    return {
        getTreeData: function () {
            return {
                id: "c1000",
                name: "Consignment C1000",
                details: {
                    plant: "Plant X",
                    materialName: "Consignment Material",
                    materialCode: "C1000",
                    consignmentDate: "2025-11-18"
                },
                children: [
                    {
                        id: "matA",
                        name: "Material Batch A",
                        details: {
                            plant: "Plant A",
                            materialName: "Material A",
                            materialCode: "matA",
                            consignmentDate: "2025-11-15"
                        },
                        children: [
                            {
                                id: "A1",
                                name: "Batch A1",
                                details: {
                                    plant: "Plant A",
                                    materialName: "Batch A1",
                                    materialCode: "A1",
                                    consignmentDate: "2025-11-10"
                                },
                                children: [
                                    {
                                        id: "A1a",
                                        name: "Production Step A1-a",
                                        value: 1,
                                        details: {
                                            plant: "Plant A",
                                            materialName: "Step A1-a",
                                            materialCode: "A1a",
                                            consignmentDate: "2025-11-10"
                                        }
                                    },
                                    {
                                        id: "A1b",
                                        name: "Production Step A1-b",
                                        details: {
                                            plant: "Plant A",
                                            materialName: "Step A1-b",
                                            materialCode: "A1b",
                                            consignmentDate: "2025-11-11"
                                        },
                                        children: [
                                            { 
                                                id: "A1b1", 
                                                name: "Detail A1-b1", 
                                                value: 1,
                                                details: {
                                                    plant: "Plant A",
                                                    materialName: "Detail A1-b1",
                                                    materialCode: "A1b1",
                                                    consignmentDate: "2025-11-11"
                                                }
                                            },
                                            { 
                                                id: "A1b2", 
                                                name: "Detail A1-b2", 
                                                value: 1,
                                                details: {
                                                    plant: "Plant A",
                                                    materialName: "Detail A1-b2",
                                                    materialCode: "A1b2",
                                                    consignmentDate: "2025-11-11"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "A2",
                                name: "Batch A2",
                                details: {
                                    plant: "Plant A",
                                    materialName: "Batch A2",
                                    materialCode: "A2",
                                    consignmentDate: "2025-11-12"
                                },
                                children: [
                                    { 
                                        id: "A2a", 
                                        name: "Old Batch A2-a", 
                                        value: 1,
                                        details: {
                                            plant: "Plant A",
                                            materialName: "Old Batch A2-a",
                                            materialCode: "A2a",
                                            consignmentDate: "2025-11-12"
                                        }
                                    },
                                    { 
                                        id: "A2b", 
                                        name: "Old Batch A2-b", 
                                        value: 1,
                                        details: {
                                            plant: "Plant A",
                                            materialName: "Old Batch A2-b",
                                            materialCode: "A2b",
                                            consignmentDate: "2025-11-12"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: "matB",
                        name: "Material Batch B",
                        details: {
                            plant: "Plant B",
                            materialName: "Material B",
                            materialCode: "matB",
                            consignmentDate: "2025-11-16"
                        },
                        children: [
                            {
                                id: "B1",
                                name: "Batch B1",
                                details: {
                                    plant: "Plant B",
                                    materialName: "Batch B1",
                                    materialCode: "B1",
                                    consignmentDate: "2025-11-14"
                                },
                                children: [
                                    { 
                                        id: "B1a", 
                                        name: "Process B1-a", 
                                        value: 1,
                                        details: {
                                            plant: "Plant B",
                                            materialName: "Process B1-a",
                                            materialCode: "B1a",
                                            consignmentDate: "2025-11-14"
                                        }
                                    },
                                    { 
                                        id: "B1b", 
                                        name: "Process B1-b", 
                                        value: 1,
                                        details: {
                                            plant: "Plant B",
                                            materialName: "Process B1-b",
                                            materialCode: "B1b",
                                            consignmentDate: "2025-11-14"
                                        }
                                    }
                                ]
                            },
                            {
                                id: "B2",
                                name: "Batch B2",
                                details: {
                                    plant: "Plant B",
                                    materialName: "Batch B2",
                                    materialCode: "B2",
                                    consignmentDate: "2025-11-15"
                                },
                                children: [
                                    {
                                        id: "B2a",
                                        name: "Old Process B2-a",
                                        details: {
                                            plant: "Plant B",
                                            materialName: "Old Process B2-a",
                                            materialCode: "B2a",
                                            consignmentDate: "2025-11-15"
                                        },
                                        children: [
                                            { 
                                                id: "B2a1", 
                                                name: "Sub B2-a1", 
                                                value: 1,
                                                details: {
                                                    plant: "Plant B",
                                                    materialName: "Sub B2-a1",
                                                    materialCode: "B2a1",
                                                    consignmentDate: "2025-11-15"
                                                }
                                            },
                                            { 
                                                id: "B2a2", 
                                                name: "Sub B2-a2", 
                                                value: 1,
                                                details: {
                                                    plant: "Plant B",
                                                    materialName: "Sub B2-a2",
                                                    materialCode: "B2a2",
                                                    consignmentDate: "2025-11-15"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
    };
});
