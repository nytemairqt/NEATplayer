//Declarations

const var Panel_Movement = Content.getComponent("Panel_Movement");
const var Button_MoveDisplay = Content.getComponent("Button_MoveDisplay");
const var Panel_MovementXYPad = Content.getComponent("Panel_MovementXYPad");

const var Slider_MovementYInvisible = Content.getComponent("Slider_MovementYInvisible");
const var Slider_MovementXInvisible = Content.getComponent("Slider_MovementXInvisible");

const var AHDSR_Macro5 = Synth.getModulator("AHDSR_Macro5");
const var AHDSR_Macro6 = Synth.getModulator("AHDSR_Macro6");

const var Label_MovementEnvAAttackValue = Content.getComponent("Label_MovementEnvAAttackValue");
const var Label_MovementEnvADecayValue = Content.getComponent("Label_MovementEnvADecayValue");
const var Label_MovementEnvASustainValue = Content.getComponent("Label_MovementEnvASustainValue");
const var Label_MovementEnvAReleaseValue = Content.getComponent("Label_MovementEnvAReleaseValue");
const var Label_MovementEnvBAttackValue = Content.getComponent("Label_MovementEnvBAttackValue");
const var Label_MovementEnvBDecayValue = Content.getComponent("Label_MovementEnvBDecayValue");
const var Label_MovementEnvBSustainValue = Content.getComponent("Label_MovementEnvBSustainValue");
const var Label_MovementEnvBReleaseValue = Content.getComponent("Label_MovementEnvBReleaseValue");

const var Button_MovementSettings = Content.getComponent("Button_MovementSettings");
const var Panel_MovementSettings = Content.getComponent("Panel_MovementSettings");

//Display Panel

inline function onButton_MoveDisplayControl(component, value)
{
    Button_FXDisplay.setValue(0);
    Panel_FX.showControl(0);   
    
    Button_ArpDisplay.setValue(0);
    Panel_Arp.showControl(0);
    
    Panel_Sample.showControl(0);
    Button_SampleDisplay.setValue(0);
	
	Panel_Movement.showControl(value);
};

Content.getComponent("Button_MoveDisplay").setControlCallback(onButton_MoveDisplayControl);

//Paint Routine

Panel_Movement.setPaintRoutine(function(g)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0);
	g.setColour(Colours.grey);
	g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0, 2.0);
	g.drawLine(this.getWidth() * 0.72, this.getWidth() * 0.72, 15, this.getHeight() - 15, 0.5);
	g.drawLine(this.getWidth() * 0.31, this.getWidth() * 0.31, 15, this.getHeight() - 15, 0.5);
});

//Settings Panel


inline function onButton_MovementSettingsControl(component, value)
{
	Panel_MovementSettings.showControl(value);
};

Content.getComponent("Button_MovementSettings").setControlCallback(onButton_MovementSettingsControl);


inline function onButton_MovementSettingsCloseControl(component, value)
{
    if (value)
    {
        Panel_MovementSettings.showControl(0);
        Button_MovementSettings.setValue(0);
    }
};

Content.getComponent("Button_MovementSettingsClose").setControlCallback(onButton_MovementSettingsCloseControl);


//XY Pad

//Might have to use this.data.x and saveInPreset...

var Movement_X;
var Movement_Y;

var Movement_Xpos = Math.range(Slider_MovementXInvisible.getValue(), 0.03, 0.97); 
var Movement_Ypos = Math.range(1-Slider_MovementYInvisible.getValue(), 0.03, 0.97);


Panel_MovementXYPad.setPaintRoutine(function(g)
{
    Movement_Xpos = Math.range(Slider_MovementXInvisible.getValue() / 100, 0.03, 0.97); 
    Movement_Ypos = Math.range(1-Slider_MovementYInvisible.getValue() / 100, 0.03, 0.97);
    
    g.setColour(0xFB111111);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0);
	g.setColour(Colours.grey);
	g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0, 2.0);
	g.setColour(Colours.darkgrey);
	
	//Cursor

    g.setColour(Colours.darkgrey);
    g.fillEllipse([this.getWidth() * Movement_Xpos -5, this.getHeight() * Movement_Ypos - 5, 10, 10]);
    g.setColour(Colours.grey);
    g.drawEllipse([this.getWidth() * Movement_Xpos -5, this.getHeight() * Movement_Ypos - 5, 10, 10], 1.0);     
});

Panel_MovementXYPad.setMouseCallback(function(event)
{
    if (event.clicked || event.drag || event.mousewheel)
    {
        Slider_MovementXInvisible.setValue(event.x / this.getWidth() * 100);
        Slider_MovementXInvisible.changed();

        Slider_MovementYInvisible.setValue(100-event.y / this.getHeight() * 100);
        Slider_MovementYInvisible.changed();

        Movement_Xpos = Math.range(Slider_MovementXInvisible.getValue() / 100, 0.03, 0.97);
        Movement_Ypos = Math.range(1-Slider_MovementYInvisible.getValue() / 100, 0.03, 0.97);

        this.repaint();        
    }
});


inline function onSlider_MovementXInvisibleControl(component, value)
{
	Synth.setMacroControl(1, Slider_MovementXInvisible.getValue() * 1.27); //XPositive
    Synth.setMacroControl(2, 127-(Slider_MovementXInvisible.getValue() * 1.27)); //XNegative
    Panel_MovementXYPad.repaint();
};

Content.getComponent("Slider_MovementXInvisible").setControlCallback(onSlider_MovementXInvisibleControl);

inline function onSlider_MovementYInvisibleControl(component, value)
{
	Synth.setMacroControl(3, Slider_MovementYInvisible.getValue() * 1.27); //YPositive
    Synth.setMacroControl(4, 127-(Slider_MovementYInvisible.getValue() * 1.27)); //YNegative
    Panel_MovementXYPad.repaint();
};

Content.getComponent("Slider_MovementYInvisible").setControlCallback(onSlider_MovementYInvisibleControl);

//Quick Map

inline function onButton_MacroAssignGainXControl(component, value)
{
    //Definitely not set("macroControl")...
    //Definitely not addToMacroControl...
    
	if (value)
    {
	    
    }
};

Content.getComponent("Button_MacroAssignGainX").setControlCallback(onButton_MacroAssignGainXControl);

inline function onButton_MacroAssignGainYControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignGainY").setControlCallback(onButton_MacroAssignGainYControl);

inline function onButton_MacroAssignModXControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignModX").setControlCallback(onButton_MacroAssignModXControl);

inline function onButton_MacroAssignModYControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignModY").setControlCallback(onButton_MacroAssignModYControl);

inline function onButton_MacroAssignFXXControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignFXX").setControlCallback(onButton_MacroAssignFXXControl);

inline function onButton_MacroAssignFXYControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignFXY").setControlCallback(onButton_MacroAssignFXYControl);

inline function onButton_MacroAssignFilterXControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignFilterX").setControlCallback(onButton_MacroAssignFilterXControl);

inline function onButton_MacroAssignFilterYControl(component, value)
{
	//Add your custom logic here...
};

Content.getComponent("Button_MacroAssignFilterY").setControlCallback(onButton_MacroAssignFilterYControl);

//=====================================================
//Envelopes

inline function onSlider_MovementEnvAAttackControl(component, value)
{
    AHDSR_Macro5.setAttribute(AHDSR_Macro5.Attack, value);
	Label_MovementEnvAAttackValue.set("text", value + "ms");
};

Content.getComponent("Slider_MovementEnvAAttack").setControlCallback(onSlider_MovementEnvAAttackControl);

inline function onSlider_MovementEnvADecayControl(component, value)
{
    AHDSR_Macro5.setAttribute(AHDSR_Macro5.Decay, value);
	Label_MovementEnvADecayValue.set("text", value + "ms");
};

Content.getComponent("Slider_MovementEnvADecay").setControlCallback(onSlider_MovementEnvADecayControl);

inline function onSlider_MovementEnvASustainControl(component, value)
{
    AHDSR_Macro5.setAttribute(AHDSR_Macro5.Sustain, value);
	Label_MovementEnvASustainValue.set("text", value + "dB");
};

Content.getComponent("Slider_MovementEnvASustain").setControlCallback(onSlider_MovementEnvASustainControl);

inline function onSlider_MovementEnvAReleaseControl(component, value)
{
    AHDSR_Macro5.setAttribute(AHDSR_Macro5.Release, value);
	Label_MovementEnvAReleaseValue.set("text", value + "ms");
};

Content.getComponent("Slider_MovementEnvARelease").setControlCallback(onSlider_MovementEnvAReleaseControl);

inline function onSlider_MovementEnvBAttackControl(component, value)
{
    AHDSR_Macro6.setAttribute(AHDSR_Macro6.Attack, value);
	Label_MovementEnvBAttackValue.set("text", value + "ms");
};

Content.getComponent("Slider_MovementEnvBAttack").setControlCallback(onSlider_MovementEnvBAttackControl);

inline function onSlider_MovementEnvBDecayControl(component, value)
{
    AHDSR_Macro6.setAttribute(AHDSR_Macro6.Decay, value);
	Label_MovementEnvBDecayValue.set("text", value + "ms");
};

Content.getComponent("Slider_MovementEnvBDecay").setControlCallback(onSlider_MovementEnvBDecayControl);

inline function onSlider_MovementEnvBSustainControl(component, value)
{
    AHDSR_Macro6.setAttribute(AHDSR_Macro6.Sustain, value);
	Label_MovementEnvBSustainValue.set("text", value + "dB");
};

Content.getComponent("Slider_MovementEnvBSustain").setControlCallback(onSlider_MovementEnvBSustainControl);

inline function onSlider_MovementEnvBReleaseControl(component, value)
{
    AHDSR_Macro6.setAttribute(AHDSR_Macro6.Release, value);
	Label_MovementEnvBReleaseValue.set("text", value + "ms");
};

Content.getComponent("Slider_MovementEnvBRelease").setControlCallback(onSlider_MovementEnvBReleaseControl);
