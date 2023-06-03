//Portal

namespace extrasPortal
{

	const Panel_PortalVelocity = Content.getComponent("Panel_PortalVelocity");
	const Label_PortalIgnoreArpVelocity = Content.getComponent("Label_PortalIgnoreArpVelocity");
	const Button_PortalIgnoreArpVelocity = Content.getComponent("Button_PortalIgnoreArpVelocity");

	inline function onButton_PortalIgnoreArpVelocityControl(component, value)
	{
		writingArpVelocity = value;
	};

	Content.getComponent("Button_PortalIgnoreArpVelocity").setControlCallback(onButton_PortalIgnoreArpVelocityControl);

}