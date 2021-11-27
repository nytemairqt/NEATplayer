/*const var AudioWaveform_OracleB = Content.getComponent("AudioWaveform_OracleB");

const var ComboBox_Oracle2A = Content.getComponent("ComboBox_Oracle2A");
const var ComboBox_Oracle2B = Content.getComponent("ComboBox_Oracle2B");

const var SampleStartOffset_Oracle2B = Synth.getModulator("SampleStartOffset_Oracle2B");

const var AHDSROracle2A = Synth.getModulator("AHDSROracle2A");
const var AHDSROracle2B = Synth.getModulator("AHDSROracle2B");

//Sampler A

//Sample Selection A

inline function onComboBox_Oracle2AControl(component, value)
{
	AudioWaveform_SamplerA.set("sampleIndex", value);
};

Content.getComponent("ComboBox_Oracle2A").setControlCallback(onComboBox_Oracle2AControl);

//Sample Start Offset A

inline function onSlider_SampleOffsetAControl(component, value)
{
	//SampleStartOffset_Oracle2A.setIntensity(1-value);
};

Content.getComponent("Slider_SampleOffsetA").setControlCallback(onSlider_SampleOffsetAControl);

//Sampler B

//Sample Selection B

inline function onComboBox_Oracle2BControl(component, value)
{
	AudioWaveform_OracleB.set("sampleIndex", value);
};

Content.getComponent("ComboBox_Oracle2B").setControlCallback(onComboBox_Oracle2BControl);

//Sample Start Offset B

inline function onSlider_OracleSampleOffsetBControl(component, value)
{
	SampleStartOffset_Oracle2B.setIntensity(1-value);
};

Content.getComponent("Slider_OracleSampleOffsetB").setControlCallback(onSlider_OracleSampleOffsetBControl);
*/