//Custom ComboBoxes

const var Label_CloudburstAcousticNoises = Content.getComponent("Label_CloudburstAcousticNoises");
const var Button_CloudburstAcousticNoises = Content.getComponent("Button_CloudburstAcousticNoises");
const var Panel_CloudburstAcousticNoises = Content.getComponent("Panel_CloudburstAcousticNoises");

/*
const var Panel_PortalVelocity = Content.getComponent("Panel_PortalVelocity");
const var Label_PortalIgnoreArpVelocity = Content.getComponent("Label_PortalIgnoreArpVelocity");
const var Button_PortalIgnoreArpVelocity = Content.getComponent("Button_PortalIgnoreArpVelocity");
*/


//Cloudburst Acoustic

var cloudburstAcousticNoises;

inline function onButton_CloudburstAcousticNoisesControl(component, value)
{
	cloudburstAcousticNoises = value;
};

Content.getComponent("Button_CloudburstAcousticNoises").setControlCallback(onButton_CloudburstAcousticNoisesControl);

//Portal

var portalArpIgnoreVelocity;

inline function onButton_PortalIgnoreArpVelocityControl(component, value)
{
	portalArpIgnoreVelocity = value;
};

Content.getComponent("Button_PortalIgnoreArpVelocity").setControlCallback(onButton_PortalIgnoreArpVelocityControl);