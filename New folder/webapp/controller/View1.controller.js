sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("getpassappv1.getpassappv1.controller.View1", {

        onInit: function () {
        },

     onSave: function () {
            var oView = this.getView();
            var oModel = oView.getModel();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            var sInTime    = oView.byId("tpGPInTime").getValue();
            var sInDate    = oView.byId("dpGPInDate").getValue();
            var sName      = oView.byId("inpGPName").getValue();
            var sMobile    = oView.byId("inpGPMobile").getValue();
            var sVehicle   = oView.byId("inpGPVehicle").getValue();
            var sDivision  = oView.byId("inpGPDivision").getValue();

            if (!sInTime) {
                sap.m.MessageToast.show("Please enter In Time");
                return;
            }
      
            if (!sInDate) {
                sap.m.MessageToast.show("Please select In Date");
                return;
            }

            if (!sName) {
                sap.m.MessageToast.show("Please enter Name");
                return;
            }

            if (!sMobile) {
                sap.m.MessageToast.show("Please enter Mobile Number");
                return;
            } 

           if (sMobile.length !== 10) {
                sap.m.MessageToast.show("Mobile number must be exactly 10 digits");
                return;
            }

            if (!/^\d+$/.test(sMobile)) {
                sap.m.MessageToast.show("Mobile number should contain digits only");
                return;
            } 


            if (!sVehicle) {
                sap.m.MessageToast.show("Please enter Vehicle Number");
                return;
            }

            if (!sDivision) {
                sap.m.MessageToast.show("Please enter Division");
                return;
            }

            var oPayload = {
                InTime: sInTime,
                InDate: sInDate,
                Name: sName,
                MobileNo: sMobile,
                VehicleNo: sVehicle,
                Division: sDivision
            };

            oModel.create("/getPassSet", oPayload, {
                success: function (oData) {

                    sap.m.MessageToast.show("Get Pass created successfully");
                    console.log(oData.SrNo);

                    oRouter.navTo("View2", {
                        SrNo: oData.SrNo
                    });

                    oView.byId("tpGPInTime").setValue("");
                    oView.byId("dpGPInDate").setValue("");
                    oView.byId("inpGPName").setValue("");
                    oView.byId("inpGPMobile").setValue("");
                    oView.byId("inpGPVehicle").setValue("");
                    oView.byId("inpGPDivision").setValue("");
                },
                error: function (oError) {
                    sap.m.MessageToast.show("Insert failed");
                    console.error(oError);
                }
            });
        }



    });
});
