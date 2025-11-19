sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("tmt.treemap.controller.Main", {

    goTreeMap() {
      const cons = this.byId("consInput").getValue();
      if (!cons) return;

      this.getOwnerComponent().getRouter().navTo("TreeMap", { cons });
    }

  });
});
