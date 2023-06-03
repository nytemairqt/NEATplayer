namespace extrasCloudburstAcoustic
{

	const var Label_CloudburstAcousticNoises = Content.getComponent("Label_CloudburstAcousticNoises");
	const var Button_CloudburstAcousticNoises = Content.getComponent("Button_CloudburstAcousticNoises");
	const var Panel_CloudburstAcousticNoises = Content.getComponent("Panel_CloudburstAcousticNoises");

	inline function onButton_CloudburstAcousticNoisesControl(component, value)
	{
		randomNoiseActive = value;
		randomReleaseNoiseActive = value;
	};

	Content.getComponent("Button_CloudburstAcousticNoises").setControlCallback(onButton_CloudburstAcousticNoisesControl);

}