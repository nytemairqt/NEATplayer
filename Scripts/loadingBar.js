
const var loadingBar = Content.addPanel("loadingBar", 0, 0);
reg currentlyLoading = false;

loadingBar.data.colour = Colours.black;

loadingBar.set("width", 300);
loadingBar.set("height", 40);
loadingBar.set("x", (Panel_BG.getWidth() / 2) - (loadingBar.getWidth() / 2));
loadingBar.set("y", (Panel_BG.getHeight() / 2) - (loadingBar.getHeight() / 2));

loadingBar.data.colour = 0x00000000;
loadingBar.data.colourFill = 0x00000000;
loadingBar.data.colourBorder = 0x00000000;
loadingBar.data.text = "";

const var loadingBarTextWidth = 200;
const var loadingBarTextHeight = 40;

loadingBar.setPaintRoutine(function(g)
{
    g.setColour(this.data.colour);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0);
    g.setColour(this.data.colourFill);
    g.fillRoundedRectangle([0, 0, this.getWidth() * (this.data.progress * 0.01), this.getHeight()], 2.0);
    g.setColour(this.data.colourBorder);
    g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2, 1);
    g.setColour(Colours.white);
    g.drawAlignedText(this.data.text, [(this.getWidth() / 2) - (loadingBarTextWidth / 2), (this.getHeight() / 2) - (loadingBarTextHeight / 2), loadingBarTextWidth, loadingBarTextHeight], "centred");    
});


loadingBar.setTimerCallback(function()
{
    this.data.progress = Engine.getPreloadProgress();
    this.data.progress = this.data.progress * 100;
    this.data.progress = Math.round(this.data.progress);
    this.data.text = "Loading: " + this.data.progress + "%";
    this.repaint();    
});

// This function will be executed whenever the preload state changes
loadingBar.setLoadingCallback(function(isPreloading)
{
	if(isPreloading)
    {       
        currentlyLoading = true;
        this.data.colour = Colours.withAlpha(Colours.black, 0.9);
        this.data.colourFill = Colours.withAlpha(Colours.lightblue, 0.6);
        this.data.colourBorder = Colours.white;
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
    }
        
    // Update the UI
    this.repaint();
    
});
