namespace LoadingBar
{
    const loadingBar = Content.addPanel("loadingBar", 0, 0);
    reg currentlyLoading = false;

    loadingBar.data.colour = Colours.black;

    loadingBar.set("width", 400);
    loadingBar.set("height", 180);
    loadingBar.set("x", (Panel_BG.getWidth() / 2) - (loadingBar.getWidth() / 2));
    loadingBar.set("y", (Panel_BG.getHeight() / 2) - loadingBar.getHeight() / 2);
    loadingBar.data.colour = Colours.withAlpha(Colours.black, 0.9);
    loadingBar.data.colourFill = Colours.withAlpha(Colours.black, 0.95);
    loadingBar.data.circleFill = Colours.withAlpha(Colours.lightblue, .5);
    loadingBar.data.colourBorder = Colours.withAlpha(Colours.lightgrey, .6);
    loadingBar.showControl(0);
    loadingBar.data.loadingCircleSize = 8;
    loadingBar.data.loadingCircleOffset = 4;
    loadingBar.data.text = "";
    loadingBar.data.randomSeed = Math.random();

    const var loadingBarTextWidth = 300;
    const var loadingBarTextHeight = 40;

    loadingBar.setPaintRoutine(function(g)
    {
        //Background Fill
        g.setColour(this.data.colourFill);
        g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 7.0);

        //Text
        g.setColour(Colours.white);
        g.setFont("Arial", 14.0);
        g.drawAlignedText(this.data.text, [(this.getWidth() / 2) - (loadingBarTextWidth / 2), (this.getHeight() / 2) - (loadingBarTextHeight / 2), loadingBarTextWidth, loadingBarTextHeight], "centred");    

        //Animations
        if (this.data.randomSeed <= 0.25)
            loadingBarPaintRoutineCircle();
        else if (this.data.randomSeed > 0.25 && this.data.randomSeed <= 0.50)
            loadingBarPaintRoutineSquare();
        else if (this.data.randomSeed > 0.50 && this.data.randomSeed <= 0.75)
            loadingBarPaintRoutineDiamond();
        else
            loadingBarPaintRoutineSnake();

    });


    loadingBar.setTimerCallback(function()
    {
        this.data.progress = Engine.getPreloadProgress();
        this.data.progress = this.data.progress * 100;
        this.data.progress = Math.round(this.data.progress);    
        this.showControl(1);

        if (Engine.getPreloadMessage().contains("Decompressing")) //Installation
            this.data.text = "Unpacking " + expansionInstallName.toString(1).substring(0, expansionInstallName.toString(1).indexOf("_")) + " " + this.data.progress + "%";
        else if (currentlyDownloading) //Updating
        {
            this.data.text = "Updating " + currentlyDownloadingName + ", please wait.";
        }
        else if (currentlyLoading) //Loading Library
            this.data.text = Engine.getPreloadMessage() + " " + this.data.progress + "%";
        else //Hide
        {        
            this.showControl(0);
            this.stopTimer();
        }

            
        //this.repaint();    
        loadingBar.repaint(); //Bug fix???
    });

    // This function will be executed whenever the preload state changes
    loadingBar.setLoadingCallback(function(isPreloading)
    {
    	if(isPreloading)
        {       
            currentlyLoading = true;
            this.startTimer(50);
        }
        else
        {       
            currentlyLoading = false;
            this.data.randomSeed = Math.random();
        }
            
        // Update the UI
        this.repaint();
        
    });

    //Paint Functions

    //Circle

    inline function loadingBarPaintRoutineCircle()
    {
        //Top
        if (this.data.progress >= 0.001)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Top Right
        if (this.data.progress >= 12.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Right
        if (this.data.progress >= 25.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom Right
        if (this.data.progress >= 37.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom
        if (this.data.progress >= 50.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom Left
        if (this.data.progress >= 62.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Left
        if (this.data.progress >= 75.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Top Left
        if (this.data.progress >= 87.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }
    }

    //Square

    inline function loadingBarPaintRoutineSquare()
    {
        //Top
        if (this.data.progress >= 0.001)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Top Right
        if (this.data.progress >= 12.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Right
        if (this.data.progress >= 25.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom Right
        if (this.data.progress >= 37.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom
        if (this.data.progress >= 50.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom Left
        if (this.data.progress >= 62.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.circleFill);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Left
        if (this.data.progress >= 75.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Top Left
        if (this.data.progress >= 87.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }
    }

    //Snake

    inline function loadingBarPaintRoutineSnake()
    {
        //Top Left
        if (this.data.progress >= 0.001)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Top
        if (this.data.progress >= 11.1)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Top Right
        if (this.data.progress >= 22.2)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Right
        if (this.data.progress >= 33.3)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Left
        if (this.data.progress >= 55.5)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom Left
        if (this.data.progress >= 66.6)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom
        if (this.data.progress >= 77.7)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom Right
        if (this.data.progress >= 88.8)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }
    }

    //Diamond

    inline function loadingBarPaintRoutineDiamond()
    {
        //Top
        if (this.data.progress >= 0.001)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Right
        if (this.data.progress >= 25.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }

        //Bottom
        if (this.data.progress >= 50.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }    

        //Left
        if (this.data.progress >= 75.0)
        {        
            g.setColour(this.data.circleFill);
            g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
            g.setColour(this.data.colourBorder);
            g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
        }
    }

}