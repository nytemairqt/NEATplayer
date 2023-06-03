namespace extrasCloudburstAcoustic
{

	const Label_CloudburstAcousticNoises = Content.getComponent("Label_CloudburstAcousticNoises");
	const Button_CloudburstAcousticNoises = Content.getComponent("Button_CloudburstAcousticNoises");
	const Panel_CloudburstAcousticNoises = Content.getComponent("Panel_CloudburstAcousticNoises");

	inline function onButton_CloudburstAcousticNoisesControl(component, value)
	{
		randomNoiseActive = value;
		randomReleaseNoiseActive = value;
	};

	Content.getComponent("Button_CloudburstAcousticNoises").setControlCallback(onButton_CloudburstAcousticNoisesControl);

}