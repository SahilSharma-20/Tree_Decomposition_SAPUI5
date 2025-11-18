sap.ui.define([
    "sap/ui/core/UIComponent",
    "tmt/treemap/model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("tmt.treemap.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            // Device model
            this.setModel(models.createDeviceModel(), "device");

            // Initialize routing
            this.getRouter().initialize();
        }

    });

});
