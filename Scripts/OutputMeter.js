//Metering

////////////////// BEGINING OF THE LEVELING ///////////////////////////


const var LEVELING_UNIT = Synth.getEffect("Simple Gain1");
const var SimpleGain1 = Synth.getEffect("Simple Gain1");

const var LEVELING_Container = Content.addPanel("LEVELING_Container", 320, 3);

Content.setPropertiesFromJSON("LEVELING_Container", {
   "width": 100,
    "height": 18,
   "itemColour": "0x00FFFFFF",
    "itemColour2": "0x00FFFFFF",
    "textColour": "0x00FFFFFF",
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
		"width": 96,
		"height": 12,
		"itemColour": 0xCCBEF5F9,
		"itemColour2": 4279505940,
		"bgColour": 4279505940,
		"textColour": 4283782485,
		"saveInPreset": true,
        "parentComponent": "LEVELING_Container",
		"opaque": 1
		});
    
		widget.data.module = module;
		
		Console.assertIsObjectOrArray(module);
		
		widget.setPaintRoutine(function(g)
		{
			g.fillAll(this.get("bgColour"));
			
			g.setColour(this.get("itemColour"));
    	
			var lsize = parseInt(this.data.lvalue * (this.getWidth()-4));
			var rsize = parseInt(this.data.rvalue * (this.getWidth()-4));
    	
			g.fillRect([2, 2, lsize, (this.getHeight()-4)/2-1]);
			g.fillRect([2, 4, rsize, (this.getHeight()-4)/2-1]);
    	
			g.setColour(this.get("itemColour2"));
    	
			for(i = 1; i < this.getHeight()-1; i = i + 3)
			{
				g.fillRect([1, i, this.getWidth()-2, 1]);
			}
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

const var outputSliderContainer = Content.addPanel("outputSliderContainer", 300, 10);
//const var OutputGain = Synth.getEffect("OutputGain");

outputSliderContainer.setPosition(323, 7, 96, 12);

