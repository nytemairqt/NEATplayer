
const var loadingBar = Content.addPanel("loadingBar", 0, 0);
reg currentlyLoading = false;

loadingBar.data.colour = Colours.black;

loadingBar.set("width", 150);
loadingBar.set("height", 150);
loadingBar.set("x", (Panel_BG.getWidth() / 2) - (loadingBar.getWidth() / 2));
loadingBar.set("y", (Panel_BG.getHeight() / 2) - loadingBar.getHeight() / 2);

loadingBar.data.colour = 0x00000000;
loadingBar.data.colourFill = 0x00000000;
loadingBar.data.colourBorder = 0x00000000;
loadingBar.data.loadingCircleSize = 20;
loadingBar.data.loadingCircleOffset = 4;
loadingBar.data.text = "";
loadingBar.data.randomSeed = Math.random();

const var loadingBarTextWidth = 200;
const var loadingBarTextHeight = 40;

loadingBar.setPaintRoutine(function(g)
{
    if (this.data.randomSeed <= 0.25)
        loadingBarPaintRoutineCircle();
    else if (this.data.randomSeed > 0.25 && this.data.randomSeed <= 0.50)
        loadingBarPaintRoutineSquare();
    else if (this.data.randomSeed > 0.50 && this.data.randomSeed <= 0.75)
        loadingBarPaintRoutineDiamond();
    else
        loadingBarPaintRoutineSnake();

    g.setColour(Colours.white);
    g.drawAlignedText(this.data.text, [(this.getWidth() / 2) - (loadingBarTextWidth / 2), (this.getHeight() / 2) - (loadingBarTextHeight / 2), loadingBarTextWidth, loadingBarTextHeight], "centred");    
});


loadingBar.setTimerCallback(function()
{
    this.data.progress = Engine.getPreloadProgress();
    this.data.progress = this.data.progress * 100;
    this.data.progress = Math.round(this.data.progress);
    //this.data.text = "Loading: " + this.data.progress + "%";
    this.data.text = Engine.getPreloadMessage() + " " + this.data.progress + "%";
    this.repaint();    
});

// This function will be executed whenever the preload state changes
loadingBar.setLoadingCallback(function(isPreloading)
{
	if(isPreloading)
    {       
        currentlyLoading = true;
        this.data.colour = Colours.withAlpha(Colours.black, 0.9);
        this.data.colourFill = Colours.withAlpha(Colours.black, 0.7);
        this.data.colourBorder = Colours.withAlpha(Colours.lightgrey, .6);
        this.startTimer(50);
    }
    else
    {       
        currentlyLoading = false;
        this.stopTimer();
        this.data.colour = 0x00000000;
        this.data.colourBorder = 0x00000000;
        this.data.colourFill = 0x00000000;
        this.data.text = "";
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
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Top Right
    if (this.data.progress >= 12.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Right
    if (this.data.progress >= 25.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom Right
    if (this.data.progress >= 37.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .75 - (this.data.loadingCircleSize * .5) + this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom
    if (this.data.progress >= 50.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom Left
    if (this.data.progress >= 62.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .75) - (this.data.loadingCircleSize / 2) + this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Left
    if (this.data.progress >= 75.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Top Left
    if (this.data.progress >= 87.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .25 - (this.data.loadingCircleSize * .5) - this.data.loadingCircleOffset, (this.getHeight() * .25) - (this.data.loadingCircleSize / 2) - this.data.loadingCircleOffset, this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }
}

//Square

inline function loadingBarPaintRoutineSquare()
{
    //Top
    if (this.data.progress >= 0.001)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Top Right
    if (this.data.progress >= 12.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Right
    if (this.data.progress >= 25.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom Right
    if (this.data.progress >= 37.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom
    if (this.data.progress >= 50.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom Left
    if (this.data.progress >= 62.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Left
    if (this.data.progress >= 75.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Top Left
    if (this.data.progress >= 87.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }
}

//Snake

inline function loadingBarPaintRoutineSnake()
{
    //Top Left
    if (this.data.progress >= 0.001)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Top
    if (this.data.progress >= 11.1)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Top Right
    if (this.data.progress >= 22.2)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Right
    if (this.data.progress >= 33.3)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Center

    if (this.data.progress >= 44.4)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Left
    if (this.data.progress >= 55.5)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom Left
    if (this.data.progress >= 66.6)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom
    if (this.data.progress >= 77.7)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }

    //Bottom Right
    if (this.data.progress >= 88.8)
    {        
        g.setColour(this.data.colourFill);
        g.fillEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.setColour(this.data.colourBorder);
        g.drawEllipse([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
    }
}

//Diamond

inline function loadingBarPaintRoutineDiamond()
{
    //Top
    if (this.data.progress >= 0.001)
    {        
        g.setColour(this.data.colourFill);
        //g.fillEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize]);
        g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
        g.setColour(this.data.colourBorder);
        //g.drawEllipse([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 1.5);
        g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .1) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
    }

    //Right
    if (this.data.progress >= 25.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
        g.setColour(this.data.colourBorder);
        g.drawRoundedRectangle([this.getWidth() * .9 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
    }

    //Bottom
    if (this.data.progress >= 50.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
        g.setColour(this.data.colourBorder);
        g.drawRoundedRectangle([this.getWidth() * .5 - (this.data.loadingCircleSize * .5), (this.getHeight() * .9) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
    }    

    //Left
    if (this.data.progress >= 75.0)
    {        
        g.setColour(this.data.colourFill);
        g.fillRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0);
        g.setColour(this.data.colourBorder);
        g.drawRoundedRectangle([this.getWidth() * .1 - (this.data.loadingCircleSize * .5), (this.getHeight() * .5) - (this.data.loadingCircleSize / 2), this.data.loadingCircleSize, this.data.loadingCircleSize], 2.0, 1.5);
    }
}