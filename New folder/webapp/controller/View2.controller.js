sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
    "use strict";  

    return Controller.extend("getpassappv1.getpassappv1.controller.View2", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("View2")
                   .attachPatternMatched(this._onRouteMatched, this);

            this.getView().setModel(new JSONModel(), "viewModel");
        },

       _onRouteMatched: function (oEvent) {
            var sSrNo = oEvent.getParameter("arguments").SrNo;
            var oView = this.getView();
            var oModel = oView.getModel();

            oView.setBusy(true); 

            oModel.read("/getPassSet('" + sSrNo + "')", {
                success: function (oData) {
                    oView.getModel("viewModel").setData(oData);
                    oView.setBusy(false);

                    this._generateQR(oData);
                }.bind(this),
                error: function () {
                    oView.setBusy(false);
                }
            });
        },

      _generateQR: function (oData) {
    var oQRData = {
        SrNo: oData.SrNo,
        InTime: oData.InTime,
        InDate: oData.InDate,
        Name: oData.Name,
        MobileNo: oData.MobileNo,
        VehicleNo: oData.VehicleNo,
        Division: oData.Division
    };

    var sQRData = encodeURIComponent(JSON.stringify(oQRData));

    var sQRUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + sQRData;

    this._convertQRToBase64(sQRUrl);
},
_convertQRToBase64: function (sUrl) {
    var oImg = new Image();
    oImg.crossOrigin = "Anonymous";

    oImg.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = oImg.width;
        canvas.height = oImg.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(oImg, 0, 0);

        var sBase64 = canvas.toDataURL("image/png");

        this.byId("htmlQR").setContent(
            "<img src='" + sBase64 + "' width='200' height='200' />"
        );
    }.bind(this);

    oImg.onerror = function () {
        sap.m.MessageToast.show("QR load failed");
    };

    oImg.src = sUrl;
},
onDownloadPdf: function () {
    var oView = this.getView();
    var oPassBox = oView.byId("vboxPassContainer").getDomRef();

    if (!oPassBox) {
        sap.m.MessageToast.show("Unable to generate PDF");
        return;
    }

    oView.setBusy(true);

    html2canvas(oPassBox, {
        scale: 3
    }).then(function (canvas) {
  
        const { jsPDF } = window.jspdf;
        var pdf = new jsPDF("p", "mm", "a4");

        var imgData = canvas.toDataURL("image/png");

        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, pageWidth - 20, pageHeight);

        var sSrNo = oView.getModel("viewModel").getProperty("/SrNo") || "Pass";
        pdf.save("GatePass_" + sSrNo + ".pdf");

        oView.setBusy(false);
    }).catch(function () { 
        oView.setBusy(false);
        sap.m.MessageToast.show("PDF generation failed");
    });
},
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPrev = oHistory.getPreviousHash();

            if (sPrev) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteView1", {}, true);
            }
        }
    });
});
