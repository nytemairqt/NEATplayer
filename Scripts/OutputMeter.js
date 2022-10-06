//Metering

////////////////// BEGINING OF THE LEVELING ///////////////////////////


const var LEVELING_UNIT = Synth.getEffect("Simple Gain1");
const var SimpleGain1 = Synth.getEffect("Simple Gain1");

const var LEVELING_Container = Content.addPanel("LEVELING_Container", 320, 5);

Content.setPropertiesFromJSON("LEVELING_Container", {
   "width": 100,
    "height": 16,
   "itemColour": "0xC9000000",
    "itemColour2": "0xC9000000",
    "textColour": "0xC9000000",
    "borderSize": 1,
    "borderRadius": 0,
});

// VU meter connected to the LEVELING_UNIT

const var LEVELING_Meter = VuMeter.createVuMeter("LEVELING_Meter", 3, 5, LEVELING_UNIT);

namespace VuMeter
{
	/** Creates a peak meter.
	*
	*	Usage: Give it a reference to a module (either synth or effect).
	*
	*	It looks best using a width and height with multiple of 4.
	*	Customize the colours using the scriptPanel colour Ids
	*/
	inline function createVuMeter(name, x, y, module)
	{
		local widget = Content.addPanel(name, x, y);
    
		Content.setPropertiesFromJSON(name, {
		"width": 160,
		"height": 16,
		"itemColour": 0x00FFFFFF,
		"itemColour2": 0x00FFFFFF,
		"bgColour": 0x00FFFFFF,
		"textColour": 0x00FFFFFF,
		"saveInPreset": true,
        "parentComponent": "LEVELING_Container",
		"opaque": 1
		});
    
		widget.data.module = module;
		
		Console.assertIsObjectOrArray(module);
		
		widget.setPaintRoutine(function(g)
		{		
			g.fillAll(this.get("bgColour"));
			
			g.setColour(Colours.withAlpha(Colours.darkgrey, .4));
			g.fillRoundedRectangle([0, 0, this.getWidth() * Slider_OutputGain.getValue(), this.getHeight()], 0.0);
			
			g.setColour(Colours.white);
			g.drawRoundedRectangle([this.getGlobalPositionX(), this.getGlobalPositionY(), this.getWidth(), this.getHeight()], 2.0, 2.0);

			g.setColour(Colours.lightblue);
    	
			var lsize = parseInt(this.data.lvalue * (this.getWidth() * Slider_OutputGain.getValue()));
			var rsize = parseInt(this.data.rvalue * (this.getWidth() * Slider_OutputGain.getValue()));

			var barHeight = 4;

			var lPosition = this.getHeight() * 0.33 - (barHeight / 2);
			var rPosition = this.getHeight() * 0.66 - (barHeight / 2);
    	
			g.fillRect([2, lPosition, lsize, barHeight]);
			g.fillRect([2, rPosition, rsize, barHeight]);
		});	
    
		widget.setTimerCallback(function()
		{
			var lvalue = getNormalizedPeakValue(Engine.getMasterPeakLevel(false));
			var rvalue = getNormalizedPeakValue(Engine.getMasterPeakLevel(true));
    	
			this.data.lvalue = Math.max(lvalue, this.data.lvalue - 0.04);
			this.data.rvalue = Math.max(rvalue, this.data.rvalue - 0.04);
    	
			this.repaintImmediately();
		});
    
		widget.startTimer(30);
		return widget;
	};

	inline function getNormalizedPeakValue(gain)
	{
		return 0.01 * (100.0 + Engine.getDecibelsForGainFactor(gain));
	}
}



////////////////// ENDING OF THE LEVELING ///////////////////////////

//OUTPUT SLIDER

const var outputSliderContainer = Content.addPanel("outputSliderContainer", 300, 11);
const var OutputGain = Synth.getEffect("OutputGain");

inline function positionOutputSliderContainer()
{
	local x = Button_OpenAppData.getGlobalPositionX() + Button_OpenAppData.getWidth() + padding;
	local y = 9;
	local w = 160;
	local h = 16;

	outputSliderContainer.setPosition(x, y, w, h);
}

positionOutputSliderContainer();

const var Slider_OutputGain = Content.getComponent("Slider_OutputGain");

inline function onSlider_OutputGainControl(component, value)
{
	OutputGain.setAttribute(OutputGain.Gain, value);
	
};

Content.getComponent("Slider_OutputGain").setControlCallback(onSlider_OutputGainControl);


inline function positionSlider_OutputGain()
{
	local x = outputSliderContainer.getGlobalPositionX();
	local y = outputSliderContainer.getGlobalPositionY();
	local w = outputSliderContainer.getWidth();
	local h = outputSliderContainer.getHeight();

	Slider_OutputGain.setPosition(x, y, w, h);
	LEVELING_Container.setPosition(x, y, w, h);
	LEVELING_Meter.setPosition(0, 0, w, h);
}

positionSlider_OutputGain();

