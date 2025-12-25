sap.ui.define([
  "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (BaseController) => {
  "use strict";

  return BaseController.extend("getpassappv1.getpassappv1.controller.App", {
      onInit() {
      },
      onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                sap.ui.core.UIComponent
                    .getRouterFor(this)
                    .navTo("RouteView1", {}, true);
            }
        }
  });
});