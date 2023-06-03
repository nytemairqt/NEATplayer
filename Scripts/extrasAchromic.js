namespace extrasAchromic
{
	const Panel_AchromicSettings = Content.getComponent("Panel_AchromicSettings");

	const Button_AchromicPickAttack = Content.getComponent("Button_AchromicPickAttack");
	const Button_AchromicReleaseNoise = Content.getComponent("Button_AchromicReleaseNoise");
	const Button_AchromicNoiseGate = Content.getComponent("Button_AchromicNoiseGate");
	const Button_AchromicForceDownpick = Content.getComponent("Button_AchromicForceDownpick");

	const achromicParameters = [Button_AchromicPickAttack, Button_AchromicReleaseNoise, Button_AchromicNoiseGate, Button_AchromicForceDownpick];

	const AchromicGate = Synth.getEffect("AchromicGate");

	//Local LAF

	Button_AchromicPickAttack.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
	Button_AchromicReleaseNoise.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
	Button_AchromicNoiseGate.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
	Button_AchromicForceDownpick.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

	var achromicForceDownpick;
	var achromicPickAttack;
	var achromicReleaseNoise;

	//Button Callbacks

	inline function onButton_AchromicPickAttackControl(component, value)
	{
		pickAttack = value;
	};

	Content.getComponent("Button_AchromicPickAttack").setControlCallback(onButton_AchromicPickAttackControl);

	inline function onButton_AchromicReleaseNoiseControl(component, value)
	{
		randomReleaseNoiseActive = value;
	};

	Content.getComponent("Button_AchromicReleaseNoise").setControlCallback(onButton_AchromicReleaseNoiseControl);

	inline function onButton_AchromicNoiseGateControl(component, value)
	{
		AchromicGate.setBypassed(1-value);
	};

	Content.getComponent("Button_AchromicNoiseGate").setControlCallback(onButton_AchromicNoiseGateControl);

	inline function onButton_AchromicForceDownpickControl(component, value)
	{
		forceDownPick = value;
	};

	Content.getComponent("Button_AchromicForceDownpick").setControlCallback(onButton_AchromicForceDownpickControl);

}