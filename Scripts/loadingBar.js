
const var Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");
const var loadingBar = Content.addPanel("loadingBar", 0, 0);

loadingBar.data.colour = Colours.black;

loadingBar.setPosition(300 - loadingBar.getWidth() / 2, 145, 100, 20);

loadingBar.data.colour = 0x00000000;
loadingBar.data.text = "";

loadingBar.setPaintRoutine(function(g)
{
    g.fillAll(this.data.colour);
    g.drawAlignedText(this.data.text, [0, 0, 100, 20], "centred");
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
        this.data.colour = 0xD5E6E6E6;
        this.startTimer(50);
    }
    else
    {       
        this.stopTimer();
        this.data.colour = 0x00000000;
        this.data.text = "";
    }
        
    // Update the UI
    this.repaint();
    
});
