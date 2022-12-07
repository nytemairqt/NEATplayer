//Arp Stuff

const var Panel_Arp = Content.getComponent("Panel_Arp");
const var Button_ArpDisplay = Content.getComponent("Button_ArpDisplay");

const var Button_ArpModeUpArrow = Content.getComponent("Button_ArpModeUpArrow");
const var Button_ArpModeDownArrow = Content.getComponent("Button_ArpModeDownArrow");

const var Arp_ModeComboBox = Content.getComponent("Arp_ModeComboBox");

const var majorNotes = [0, 2, 4, 5, 7, 9, 11, 12];
const var minorNotes = [0, 2, 3, 5, 7, 8, 10, 12];

var wasArpOn = 0;

const var Arpeggiator1 = Synth.getMidiProcessor("Arpeggiator1");
const var Button_ArpBypass = Content.getComponent("Button_ArpBypass");
const var Button_ArpSustain = Content.getComponent("Button_ArpSustain");

const var Slider_ArpSteps = Content.getComponent("Slider_ArpSteps");
const var Slider_ArpSpeed = Content.getComponent("Slider_ArpSpeed");
const var Slider_ArpOctave = Content.getComponent("Slider_ArpOctave");
const var Slider_ArpSwing = Content.getComponent("Slider_ArpSwing");

const var Label_ArpSwingValue = Content.getComponent("Label_ArpSwingValue");
const var Label_ArpOctaveValue = Content.getComponent("Label_ArpOctaveValue");
const var Label_ArpSpeedValue = Content.getComponent("Label_ArpSpeedValue");
const var Label_ArpStepsValue = Content.getComponent("Label_ArpStepsValue");

const var arpTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];
const var SliderPack_ArpVelocity = Content.getComponent("SliderPack_ArpVelocity");
const var SliderPack_ArpNotes = Content.getComponent("SliderPack_ArpNotes");
const var SliderPack_ArpLength = Content.getComponent("SliderPack_ArpLength");

const var Button_ArpNotesReset = Content.getComponent("Button_ArpNotesReset");
const var Button_ArpVelocityReset = Content.getComponent("Button_ArpVelocityReset");
const var Button_ArpLengthReset = Content.getComponent("Button_ArpLengthReset");

const var Button_ArpNotesMinor = Content.getComponent("Button_ArpNotesMinor");
const var Button_ArpNotesMajor = Content.getComponent("Button_ArpNotesMajor");

const var Button_ArpNotesInvert = Content.getComponent("Button_ArpNotesInvert");

const var Label_Arp = Content.getComponent("Label_Arp");

//Arp Panel

inline function onButton_ArpDisplayControl(component, value)
{
    if (value)
        closePanels(Button_ArpDisplay);

    Panel_Arp.showControl(value);
};

Content.getComponent("Button_ArpDisplay").setControlCallback(onButton_ArpDisplayControl);

//Close Button

inline function onButton_CloseArpPanelControl(component, value)
{
    if (value)
        closePanels("none");
};

Content.getComponent("Button_CloseArpPanel").setControlCallback(onButton_CloseArpPanelControl);

//Paint Routine

Panel_Arp.setPaintRoutine(function(g)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0);
});

//Arpeggiator Controls

inline function turnArpOn()
{
    Button_ArpBypass.setValue(1);
    Arpeggiator1.setBypassed(0);
}

inline function restoreArp()
{
    if (wasArpOn == 1)
    {
        Button_ArpBypass.setValue(1);
        Button_ArpBypass.changed();
    }     
    else 
    {
        Button_ArpBypass.setValue(0);
        Button_ArpBypass.changed();        
    }
}

inline function onButton_ArpBypassControl(component, value)
{
    wasArpOn = value;
	Arpeggiator1.setBypassed(1-value);
	
	//To get Achromic working
    /*

    if (currentExpansion == "Achromic")
    {
      	SamplerA.asSampler().enableRoundRobin(value);
        SamplerB.asSampler().enableRoundRobin(value);
        
        if (!value)
        {
            SamplerA.asSampler().setActiveGroup(1);
            SamplerB.asSampler().setActiveGroup(2);       
        }
    }
    */
};

Content.getComponent("Button_ArpBypass").setControlCallback(onButton_ArpBypassControl);

inline function onSlider_ArpStepsControl(component, value)
{
	Arpeggiator1.setAttribute(Arpeggiator1.NumStepSlider, value);
	Label_ArpStepsValue.set("text", Math.round(value));
};

Content.getComponent("Slider_ArpSteps").setControlCallback(onSlider_ArpStepsControl);


inline function onSlider_ArpSpeedControl(component, value)
{
	Arpeggiator1.setAttribute(Arpeggiator1.SpeedKnob, value);
	Label_ArpSpeedValue.set("text", arpTimes[value]);
};

Content.getComponent("Slider_ArpSpeed").setControlCallback(onSlider_ArpSpeedControl);


inline function onSlider_ArpOctaveControl(component, value)
{
	Arpeggiator1.setAttribute(Arpeggiator1.OctaveRange, value);
	Label_ArpOctaveValue.set("text", Math.round(value));
};

Content.getComponent("Slider_ArpOctave").setControlCallback(onSlider_ArpOctaveControl);


inline function onSlider_ArpSwingControl(component, value)
{
	Arpeggiator1.setAttribute(Arpeggiator1.Shuffle, value);
	Label_ArpSwingValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_ArpSwing").setControlCallback(onSlider_ArpSwingControl);


inline function onButton_ArpNotesResetControl(component, value)
{
	SliderPack_ArpNotes.setAllValues(0);
	SliderPack_ArpNotes.changed();
};

Content.getComponent("Button_ArpNotesReset").setControlCallback(onButton_ArpNotesResetControl);


inline function onButton_ArpVelocityResetControl(component, value)
{
	SliderPack_ArpVelocity.setAllValues(110);
	SliderPack_ArpVelocity.changed();
};

Content.getComponent("Button_ArpVelocityReset").setControlCallback(onButton_ArpVelocityResetControl);

inline function onButton_ArpLengthResetControl(component, value)
{
	SliderPack_ArpLength.setAllValues(80);
	SliderPack_ArpLength.changed();
};

Content.getComponent("Button_ArpLengthReset").setControlCallback(onButton_ArpLengthResetControl);

//Random Major/Minor scales (1 octave):

inline function onButton_ArpNotesMinorControl(component, value)
{
	if (value)
        {        
            for (s=0; s<SliderPack_ArpNotes.getNumSliders(); s++)
            {
                SliderPack_ArpNotes.setSliderAtIndex(s, minorNotes[Math.randInt(0,minorNotes.length)]);
                SliderPack_ArpNotes.changed();             
            }       
        }
};

Content.getComponent("Button_ArpNotesMinor").setControlCallback(onButton_ArpNotesMinorControl);

inline function onButton_ArpNotesMajorControl(component, value)
{
	if (value)
        {        
            for (s=0; s<SliderPack_ArpNotes.getNumSliders(); s++)
            {
                SliderPack_ArpNotes.setSliderAtIndex(s, majorNotes[Math.randInt(0,majorNotes.length)]);
                SliderPack_ArpNotes.changed();             
            }       
        }
};

Content.getComponent("Button_ArpNotesMajor").setControlCallback(onButton_ArpNotesMajorControl);

var arpNotes = [];

inline function onButton_ArpNotesInvertControl(component, value)
{ 
	if (value)
    {     
        for (s=0; s<SliderPack_ArpNotes.getNumSliders(); s++)
        {
            arpNotes[s] = SliderPack_ArpNotes.getSliderValueAt(s);
        } 
    }
    
    else
    {
        //SliderPack_ArpNotes.setSliderAtIndex(s, 0-SliderPack_ArpNotes.getSliderValueAt(s));
        for (n=0; n<SliderPack_ArpNotes.getNumSliders(); n++)
        {
            SliderPack_ArpNotes.setSliderAtIndex(n, 0-arpNotes[n]);
        } 
    }
    SliderPack_ArpNotes.changed();
};

Content.getComponent("Button_ArpNotesInvert").setControlCallback(onButton_ArpNotesInvertControl);


inline function onButton_ArpModeUpArrowControl(component, value)
{
	if (value)
    {
	    if (Arp_ModeComboBox.getValue() > Arp_ModeComboBox.get("min"))
        {
            Arp_ModeComboBox.setValue(Arp_ModeComboBox.getValue() - 1);
            Arp_ModeComboBox.changed();
        }
            else
        {
            Arp_ModeComboBox.setValue(Arp_ModeComboBox.get("max"));
            Arp_ModeComboBox.changed();
        }
    }       
};

Content.getComponent("Button_ArpModeUpArrow").setControlCallback(onButton_ArpModeUpArrowControl);

inline function onButton_ArpModeDownArrowControl(component, value)
{
	if (value)
    {
	    if (Arp_ModeComboBox.getValue() < Arp_ModeComboBox.get("max"))
        {
            Arp_ModeComboBox.setValue(Arp_ModeComboBox.getValue() + 1);
            Arp_ModeComboBox.changed();
        }
            else
        {
            Arp_ModeComboBox.setValue(Arp_ModeComboBox.get("min"));
            Arp_ModeComboBox.changed();
        }
    } 
};

Content.getComponent("Button_ArpModeDownArrow").setControlCallback(onButton_ArpModeDownArrowControl);


