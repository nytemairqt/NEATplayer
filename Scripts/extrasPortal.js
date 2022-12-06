//Portal

const var Panel_PortalVelocity = Content.getComponent("Panel_PortalVelocity");
const var Label_PortalIgnoreArpVelocity = Content.getComponent("Label_PortalIgnoreArpVelocity");
const var Button_PortalIgnoreArpVelocity = Content.getComponent("Button_PortalIgnoreArpVelocity");
var portalArpIgnoreVelocity;

inline function onButton_PortalIgnoreArpVelocityControl(component, value)
{
	writingArpVelocity = value;
};

Content.getComponent("Button_PortalIgnoreArpVelocity").setControlCallback(onButton_PortalIgnoreArpVelocityControl);