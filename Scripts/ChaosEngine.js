//Chaos Engine

//GUI Elements

const var ComboBox_ChaosType = Content.getComponent("ComboBox_ChaosType");
const var Slider_MovementChaosIntensity = Content.getComponent("Slider_MovementChaosIntensity");
const var Slider_MovementChaosRate = Content.getComponent("Slider_MovementChaosRate");

const var Label_ChaosRateValue = Content.getComponent("Label_ChaosRateValue");
const var Label_ChaosIntensityValue = Content.getComponent("Label_ChaosIntensityValue");

const var chaosTimer = Engine.createTimerObject();

reg chaosXTarget;
reg chaosYTarget;

reg chaosStage = 1;
reg chaosStageTwister = 1;

reg chaosRate;

reg chaosXRemainder;
reg chaosYRemainder;

//==========================================================
//FUNCTIONS

//X Drift Function

inline function chaosXDrift()
{
    switch (chaosStage)
    {
        case 1: //Sets middle position
            Slider_MovementXInvisible.setValue(50);
            chaosStage = 2;
        break;
        
        case 2: //Travelling Right
            chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = chaosXTarget - Slider_MovementXInvisible.getValue();
            
            if (Slider_MovementXInvisible.getValue() < chaosXTarget)
            {
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() + chaosXRemainder);
                    chaosStage = 3;
                }
                else
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() + chaosRate);
            }
                
            else
                chaosStage = 3;
        break;
        
        case 3: //Travelling Left
            chaosXTarget = 50 - Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = Slider_MovementXInvisible.getValue() - chaosXTarget;
            
            if (Slider_MovementXInvisible.getValue() > chaosXTarget)
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() - chaosXRemainder);
                    chaosStage = 2;
                }
                else 
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() - chaosRate);

            else
                chaosStage = 2;
        break;
    }

    Slider_MovementXInvisible.changed();
}

//Y Drift Function

inline function chaosYDrift()
{
    switch (chaosStage)
    {
        case 1: //Sets middle position
            Slider_MovementYInvisible.setValue(50);
            chaosStage = 2;
        break;
        
        case 2: //Travelling Up
            chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = chaosYTarget - Slider_MovementYInvisible.getValue();
            
            if (Slider_MovementYInvisible.getValue() < chaosYTarget)
            {
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() + chaosXRemainder);
                    chaosStage = 3;
                }
                else
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() + chaosRate);
            }
                
            else
                chaosStage = 3;
        break;
        
        case 3: //Travelling Down
            chaosYTarget = 50 - Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = Slider_MovementYInvisible.getValue() - chaosYTarget;
            
            if (Slider_MovementYInvisible.getValue() > chaosYTarget)
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() - chaosXRemainder);
                    chaosStage = 2;
                }
                else 
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() - chaosRate);

            else
                chaosStage = 2;
        break;
    }
 
    Slider_MovementYInvisible.changed();
}

//Orbit Function

inline function chaosOrbit()
{
    switch (chaosStage)
    {
        //Top Left to Top Right
        case 1:
            if (Slider_MovementXInvisible.getValue() >= chaosXTarget)
            {
                chaosStage = 2;
                chaosYTarget = 50 - Slider_MovementChaosIntensity.getValue();
            }
        
            if (Slider_MovementXInvisible.getValue() < chaosXTarget)
                Slider_MovementXInvisible.setValue(Math.round(Slider_MovementXInvisible.getValue() + chaosRate));
                
            Slider_MovementXInvisible.changed();
        break; 
        
        //Top Right to Bottom Right
        case 2:
            if (Slider_MovementYInvisible.getValue() <= chaosYTarget)
            {
                chaosStage = 3;
                chaosXTarget = 50 - Slider_MovementChaosIntensity.getValue();
            }
        
            if (Slider_MovementYInvisible.getValue() > chaosYTarget)
                Slider_MovementYInvisible.setValue(Math.round(Slider_MovementYInvisible.getValue() - chaosRate));
                
            Slider_MovementYInvisible.changed();
        break; 
        
        //Bottom Right to Bottom Left
        case 3:
            if (Slider_MovementXInvisible.getValue() <= chaosXTarget)
            {
                chaosStage = 4;
                chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();
            }
        
            if (Slider_MovementXInvisible.getValue() > chaosXTarget)
                Slider_MovementXInvisible.setValue(Math.round(Slider_MovementXInvisible.getValue() - chaosRate));
                
            Slider_MovementXInvisible.changed();
        break; 
        
        //Bottom Left to Top Left
        case 4:
            if (Slider_MovementYInvisible.getValue() >= chaosYTarget)
            {
                chaosStage = 1;
                chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
            }
        
            if (Slider_MovementYInvisible.getValue() < chaosYTarget)
                Slider_MovementYInvisible.setValue(Math.round(Slider_MovementYInvisible.getValue() + chaosRate));
                
            Slider_MovementYInvisible.changed();
        break; 
    }
}

//Circular Function

inline function chaosCircular()
{
    local angle = Math.toRadians(360 - chaosStage);
    local radius = Slider_MovementChaosIntensity.getValue();
    
    Slider_MovementXInvisible.setValue(50 + radius * Math.cos(angle));
    Slider_MovementYInvisible.setValue(50 + radius * Math.sin(angle));
    
    if (chaosStage < 359)
        chaosStage += chaosRate;
    else
        chaosStage = 1;
        
    Slider_MovementXInvisible.changed();
    Slider_MovementYInvisible.changed();
}

inline function chaosTwister()
{
    switch (chaosStage)
    {
        case 1: //Sets middle position
            Slider_MovementXInvisible.setValue(50);
            chaosStage = 2;
        break;
        
        case 2: //Travelling Right
            chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = chaosXTarget - Slider_MovementXInvisible.getValue();
            
            if (Slider_MovementXInvisible.getValue() < chaosXTarget)
            {
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() + chaosXRemainder);
                    chaosStage = 3;
                }
                else
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() + chaosRate);
            }
                
            else
                chaosStage = 3;
        break;
        
        case 3: //Travelling Left
            chaosXTarget = 50 - Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = Slider_MovementXInvisible.getValue() - chaosXTarget;
            
            if (Slider_MovementXInvisible.getValue() > chaosXTarget)
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() - chaosXRemainder);
                    chaosStage = 2;
                }
                else 
                    Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() - chaosRate);

            else
                chaosStage = 2;
        break;
    }
    
    switch (chaosStageTwister)
    {
        case 1: //Sets middle position
            
            Slider_MovementYInvisible.setValue(50 + Slider_MovementChaosIntensity.getValue());
            chaosStageTwister = 2;
        break;
        
        case 2: //Travelling Up
            chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = chaosYTarget - Slider_MovementYInvisible.getValue();
            
            if (Slider_MovementYInvisible.getValue() < chaosYTarget)
            {
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() + chaosXRemainder);
                    chaosStage = 3;
                }
                else
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() + chaosRate / 8);
            }
                
            else
                chaosStageTwister = 3;
        break;
        
        case 3: //Travelling Down
            chaosYTarget = 50 - Slider_MovementChaosIntensity.getValue();
            chaosXRemainder = Slider_MovementYInvisible.getValue() - chaosYTarget;
            
            if (Slider_MovementYInvisible.getValue() > chaosYTarget)
                if (chaosXRemainder < chaosRate)
                {
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() - chaosXRemainder);
                    chaosStage = 2;
                }
                else 
                    Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() - chaosRate / 8);

            else
                chaosStageTwister = 2;
        break;
    }

    Slider_MovementXInvisible.changed();
    Slider_MovementYInvisible.changed();
}

//Random Drift Function

inline function chaosRandomDrift()
{   
    
    //Reroll Targets on Counter
    if (chaosStage > 20 - chaosRate)
    {
        chaosXTarget = 50 + Math.randInt(-50, 50) * Slider_MovementChaosIntensity.getValue() / 100;
        chaosYTarget = 50 + Math.randInt(-50, 50) * Slider_MovementChaosIntensity.getValue() / 100;    
        chaosStage = 1;
    }
    
    //Travelling Right
    
    if (Slider_MovementXInvisible.getValue() < chaosXTarget)
    {
        //Check if the remainder is less than chaosRate
        chaosXRemainder = chaosXTarget - Slider_MovementXInvisible.getValue();
        
        if (chaosXRemainder > chaosRate)
        {
            //Iterates the slider and incremenets chaosStage
            Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() + chaosRate * .3);
            chaosStage += 1;
        }
        else
        {
            //Calls new target and refreshes stage counter
            Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() + chaosXRemainder);
            chaosXTarget = 50 + Math.randInt(-50, 50) * Slider_MovementChaosIntensity.getValue() / 100;
            chaosStage = 1;
        }
    }
    
    //Travelling Left
    
    else
    {
        //Check if the remainder is less than chaosRate
        chaosXRemainder = Slider_MovementXInvisible.getValue() - chaosRate;
        
        if (chaosXRemainder > chaosRate)
        {
            //Iterates the slider and incremenets chaosStage
            Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() - chaosRate * .3);
            chaosStage += 1;
        }
        else
        {
            //Calls new target and refreshes stage counter
            Slider_MovementXInvisible.setValue(Slider_MovementXInvisible.getValue() - chaosXRemainder);
            chaosXTarget = 50 + Math.randInt(-50, 50) * Slider_MovementChaosIntensity.getValue() / 100;
            chaosStage = 1;
        }
    }
    
    //Travelling Up
    
    if (Slider_MovementYInvisible.getValue() < chaosYTarget)
    {
        //Check if the remainder is less than chaosRate
        chaosYRemainder = chaosYTarget - Slider_MovementYInvisible.getValue();
        
        if (chaosYRemainder > chaosRate)
        {
            //Iterates the slider and incremenets chaosStage
            Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() + chaosRate * .3);
            chaosStage += 1;
        }
        else
        {
            //Calls new target and refreshes stage counter
            Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() + chaosYRemainder);
            chaosYTarget = 50 + Math.randInt(-50, 50) * Slider_MovementChaosIntensity.getValue() / 100;
            chaosStage = 1;
        }
    }
    
    //Travelling Down
    
    else
    {
        //Check if the remainder is less than chaosRate
        chaosYRemainder = Slider_MovementYInvisible.getValue() - chaosRate;
        
        if (chaosYRemainder > chaosRate)
        {
            //Iterates the slider and incremenets chaosStage
            Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() - chaosRate * .3);
            chaosStage += 1;
        }
        else
        {
            //Calls new target and refreshes stage counter
            Slider_MovementYInvisible.setValue(Slider_MovementYInvisible.getValue() - chaosYRemainder);
            chaosYTarget = 50 + Math.randInt(-50, 50) * Slider_MovementChaosIntensity.getValue() / 100;
            chaosStage = 1;
        }
    }
    
    Slider_MovementYInvisible.changed();
    Slider_MovementXInvisible.changed();
}

//Random Jump Function

inline function chaosRandomJump()
{
    if (chaosStage > 20 - Slider_MovementChaosRate.getValue())
    {
        local posX = Math.randInt(-100, 100) * Slider_MovementChaosIntensity.getValue() / 100;
        local posY = Math.randInt(-100, 100) * Slider_MovementChaosIntensity.getValue() / 100;
    
        Slider_MovementXInvisible.setValue(50 + posX);
        Slider_MovementYInvisible.setValue(50 + posY);
    
        Slider_MovementXInvisible.changed();
        Slider_MovementYInvisible.changed();
    
        chaosStage = 1;
    }
    
    else 
        chaosStage += 1;
}

//X Drift

chaosTimer.setTimerCallback(function()
{   
    switch (ComboBox_ChaosType.getValue())
    {
        case 1:
            chaosXDrift();
        break;
        
        case 2:
            chaosYDrift();
        break;
        
        case 3:
            chaosOrbit();
        break;
        
        case 4:
            chaosCircular();
        break;
        
        case 5:
            chaosTwister();
        break;
        
        case 6:
            chaosRandomDrift();
        break;
        
        case 7:
            chaosRandomJump();
        break;
    }    
        Panel_MovementXYPad.repaint();    
});

//Bypass

const var Button_ChaosBypass = Content.getComponent("Button_ChaosBypass");

inline function onButton_ChaosBypassControl(component, value)
{
    if (value)
    {
        switch (ComboBox_ChaosType.getValue())
            {
                //X Drift
                case 1:
                    chaosStage = 1;
                    chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
                break;
            
                //Y Drift
                case 2:
                    chaosStage = 1;
                    chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();
                break;
            
                //Orbit
                case 3:
                    chaosStage = 1;
                    chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
                    Slider_MovementXInvisible.setValue(50 - Slider_MovementChaosIntensity.getValue());
                    Slider_MovementYInvisible.setValue(50 + Slider_MovementChaosIntensity.getValue());
                break;
            
                case 5:
                    chaosStage = 1;
                    chaosStageTwister = 1;
                break;
            
                case 6:
                    chaosStage = 1;
            
                case 7:
                    chaosStage = 1;
            }
            chaosTimer.startTimer(33.3333);            
    }
        else
            chaosTimer.stopTimer();
};

Content.getComponent("Button_ChaosBypass").setControlCallback(onButton_ChaosBypassControl);


//Slider Rate



inline function onSlider_MovementChaosRateControl(component, value)
{
    chaosRate = value;
    if (Button_ChaosBypass.getValue())
        chaosTimer.startTimer(33.3333);
        
        if (value < 5)
            Label_ChaosRateValue.set("text", "Slow");
        else if (value > 5 && value < 10)
            Label_ChaosRateValue.set("text", "Medium");
        else if (value > 10 && value < 15)
            Label_ChaosRateValue.set("text", "Fast");
        else 
            Label_ChaosRateValue.set("text", "!!!");
        
};

Content.getComponent("Slider_MovementChaosRate").setControlCallback(onSlider_MovementChaosRateControl);


//Slider Intensity


inline function onSlider_MovementChaosIntensityControl(component, value)
{	
	if (Button_ChaosBypass.getValue())
    {
        switch (ComboBox_ChaosType.getValue())
        {
            //X Drift
            case 1:
                chaosStage = 1;
                chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
            break;
            
            //Y Drift
            case 2:
                chaosStage = 1;
                chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();
            break;
            
            //Orbit
            case 3:
                chaosStage = 1;
                chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
                Slider_MovementXInvisible.setValue(50 - Slider_MovementChaosIntensity.getValue());
                Slider_MovementYInvisible.setValue(50 + Slider_MovementChaosIntensity.getValue());
            break;
            
            //Circular
            
            case 4:
                chaosStage = 1;
            break;
            
            //Twister
            
            case 5:
                chaosStage = 1;
                chaosStageTwister = 1;
            break;
            
            //Random Drift
            
            case 6:
                chaosStage = 1;
            break;
            
            //Random Jump
            
            case 7:
                chaosStage = 1;
            break;
                
        }
        
	    chaosTimer.startTimer(33.3333);
	    
    }

	Label_ChaosIntensityValue.set("text", value * 2 + "%");
};

Content.getComponent("Slider_MovementChaosIntensity").setControlCallback(onSlider_MovementChaosIntensityControl);



inline function onComboBox_ChaosTypeControl(component, value)
{
    switch (value)
    {
        //X Drift
        case 1:
            chaosStage = 1;
            chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
        break;
        
        
    //Y Drift
        case 2:
            chaosStage = 1;
            chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();
        break;
        
        //Orbit
        case 3:
            chaosStage = 1;
            chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
            Slider_MovementXInvisible.setValue(50 - Slider_MovementChaosIntensity.getValue());
            Slider_MovementYInvisible.setValue(50 + Slider_MovementChaosIntensity.getValue());
        break;
            
        //Circular
            
        case 4:
            chaosStage = 1;
        break;
            
        //Twister
            
        case 5:
            chaosStage = 1;
            chaosStageTwister = 1;
        break;
            
        //Random Drift
            
        case 6:
            chaosStage = 1;
        break;
            
        //Random Jump
            
        case 7:
            chaosStage = 1;
        break;
    }
             
	if (Button_ChaosBypass.getValue())
	    chaosTimer.startTimer(33.3333);   	   
};

Content.getComponent("ComboBox_ChaosType").setControlCallback(onComboBox_ChaosTypeControl);

//Up Down Buttons


inline function onButton_ChaosTypeUpControl(component, value)
{
	if (value)
	    if (ComboBox_ChaosType.getValue() > ComboBox_ChaosType.get("min"))
	        ComboBox_ChaosType.setValue(ComboBox_ChaosType.getValue() - 1);
	    else
	        ComboBox_ChaosType.setValue(ComboBox_ChaosType.get("max"));
    ComboBox_ChaosType.changed();
};

Content.getComponent("Button_ChaosTypeUp").setControlCallback(onButton_ChaosTypeUpControl);

inline function onButton_ChaosTypeDownControl(component, value)
{
	if (value)
	    if (ComboBox_ChaosType.getValue() < ComboBox_ChaosType.get("max"))
	        ComboBox_ChaosType.setValue(ComboBox_ChaosType.getValue() + 1);
	    else
	        ComboBox_ChaosType.setValue(ComboBox_ChaosType.get("min"));
    ComboBox_ChaosType.changed();
};

Content.getComponent("Button_ChaosTypeDown").setControlCallback(onButton_ChaosTypeDownControl);
