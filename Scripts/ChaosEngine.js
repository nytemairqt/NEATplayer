namespace chaosEngine
{
    // GUI Elements

    const Button_ChaosTypeA = Content.getComponent("Button_ChaosTypeA");
    const Button_ChaosTypeB = Content.getComponent("Button_ChaosTypeB");
    const Button_ChaosTypeC = Content.getComponent("Button_ChaosTypeC");
    const Button_ChaosTypeD = Content.getComponent("Button_ChaosTypeD");
    const Button_ChaosTypeE = Content.getComponent("Button_ChaosTypeE");
    const Button_ChaosTypeF = Content.getComponent("Button_ChaosTypeF");
    const Button_ChaosTypeG = Content.getComponent("Button_ChaosTypeG");

    const Slider_MovementChaosIntensity = Content.getComponent("Slider_MovementChaosIntensity");
    const Slider_MovementChaosRate = Content.getComponent("Slider_MovementChaosRate");

    const Label_ChaosRateValue = Content.getComponent("Label_ChaosRateValue");
    const Label_ChaosIntensityValue = Content.getComponent("Label_ChaosIntensityValue");

    const chaosTimer = Engine.createTimerObject();

    reg chaosType = 1;

    reg chaosXTarget;
    reg chaosYTarget;

    reg chaosStage = 1;
    reg chaosStageTwister = 1;

    reg chaosRate;

    reg chaosXRemainder;
    reg chaosYRemainder;

    // Functions

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
        switch (chaosType)
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
            switch (chaosType)
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
            else if (value >= 5 && value < 11)
                Label_ChaosRateValue.set("text", "Medium");
            else if (value >= 11 && value < 15)
                Label_ChaosRateValue.set("text", "Fast");
            else 
                Label_ChaosRateValue.set("text", "Very Fast");
            
    };

    Content.getComponent("Slider_MovementChaosRate").setControlCallback(onSlider_MovementChaosRateControl);


    //Slider Intensity


    inline function onSlider_MovementChaosIntensityControl(component, value)
    {	
    	if (Button_ChaosBypass.getValue())
        {
            switch (chaosType)
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

    	Label_ChaosIntensityValue.set("text", Math.round(value) * 2 + "%");
    };

    Content.getComponent("Slider_MovementChaosIntensity").setControlCallback(onSlider_MovementChaosIntensityControl);

    //Buttons


    inline function onButton_ChaosTypeAControl(component, value)
    { 
        //X Drift
        if (value)
        {
            chaosType = 1;
            chaosStage = 1;
            chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333);   
        }
    };

    Content.getComponent("Button_ChaosTypeA").setControlCallback(onButton_ChaosTypeAControl);

    inline function onButton_ChaosTypeBControl(component, value)
    {
        //Y Drift
        if (value)
        {    
            chaosType = 2;
            chaosStage = 1;
            chaosYTarget = 50 + Slider_MovementChaosIntensity.getValue();

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333);   
        }
    };

    Content.getComponent("Button_ChaosTypeB").setControlCallback(onButton_ChaosTypeBControl);

    inline function onButton_ChaosTypeCControl(component, value)
    {
        //Orbit
        if (value)
        {
            chaosType = 3;
            chaosStage = 1;
            chaosXTarget = 50 + Slider_MovementChaosIntensity.getValue();
            Slider_MovementXInvisible.setValue(50 - Slider_MovementChaosIntensity.getValue());
            Slider_MovementYInvisible.setValue(50 + Slider_MovementChaosIntensity.getValue());

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333); 
        }  
    };

    Content.getComponent("Button_ChaosTypeC").setControlCallback(onButton_ChaosTypeCControl);

    inline function onButton_ChaosTypeDControl(component, value)
    {
        //Circular
        if (value)
        {
            chaosType = 4;
            chaosStage = 1;

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333);   
        }
    };

    Content.getComponent("Button_ChaosTypeD").setControlCallback(onButton_ChaosTypeDControl);

    inline function onButton_ChaosTypeEControl(component, value)
    {
        //Twister
        if (value)
        {
            chaosType = 5;
            chaosStage = 1;
            chaosStageTwister = 1;

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333);   
        }
    };

    Content.getComponent("Button_ChaosTypeE").setControlCallback(onButton_ChaosTypeEControl);

    inline function onButton_ChaosTypeFControl(component, value)
    {
        //Random Drift
        if (value)
        {    
            chaosType = 6;
            chaosStage = 1;

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333);   
        }
    };

    Content.getComponent("Button_ChaosTypeF").setControlCallback(onButton_ChaosTypeFControl);

    inline function onButton_ChaosTypeGControl(component, value)
    {
        //Random Jump
        if (value)
        {    
            chaosType = 7;
            chaosStage = 1;

            if (Button_ChaosBypass.getValue())
                chaosTimer.startTimer(33.3333);   
        }
    };

    Content.getComponent("Button_ChaosTypeG").setControlCallback(onButton_ChaosTypeGControl);

}