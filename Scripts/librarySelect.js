//Library Select

var currentExpansion; 


const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder"); 
const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions"); 
const var Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");
const var Button_CloseExpansions = Content.getComponent("Button_CloseExpansions");



const var expansionNames = [];

expansionNames.push("No Expansion");

for (e in expHandler.getExpansionList())
    expansionNames.push(e.getProperties().Name);

const var expButton = [];

const var expButtonPadding = 19;
const var expButtonHeight = 176;
const var expButtonSize = 176;
//Panel_ExpansionsItemHolder.set("height", 20);
//Panel_ExpansionsItemHolder.setPosition(0, 3, 186, 20);

const var expPanelTitle = Panel_ExpansionsItemHolder.addChildPanel();
expPanelTitle.setPosition(0, 0, Panel_ExpansionsItemHolder.getWidth(), 20);
expPanelTitle.setPaintRoutine(function(g)
{
    g.fillAll(0x1B1B1B);
    g.setFont("Arial", 12.0);
    g.setColour(Colours.white);
    g.drawAlignedText("- Libraries -", [0 , 0, Panel_ExpansionsItemHolder.getWidth(), 20], "centred");
});
    
for (i=1; i<expansionNames.length; i++)
{
    //Panel_ExpansionsItemHolder.set("height", 20 + expansionNames.length * expButtonHeight - expButtonHeight);
    expButton[i] = Panel_ExpansionsItemHolder.addChildPanel();
    //expButton[i].setPosition(0, 20 + i * expButtonHeight - expButtonHeight, Panel_ExpansionsItemHolder.getWidth(), expButtonHeight);
    expButton[i].set("width", expButtonSize);
    expButton[i].set("height", expButtonSize);

    if (i <= 5)
    {
        expButton[i].set("x", (expButtonPadding * i) + (expButtonHeight * (i - 1)));
        expButton[i].set('y', expButtonPadding);
    }
    else if (i >= 6 && i <= 10)
    {
        expButton[i].set("x", (expButtonPadding * (i-5)) + (expButtonHeight * ((i-5) - 1)));
        expButton[i].set('y', (expButtonPadding * 2 + expButtonSize));
    }
    else if (i >= 11 && i <= 15)
    {
        expButton[i].set("x", (expButtonPadding * (i-10)) + (expButtonHeight * ((i-10) - 1)));
        expButton[i].set('y', (expButtonPadding * 3 + (expButtonSize * 2)));
    }
    else if (i >= 16 && i <= 20)
    {
        expButton[i].set("x", (expButtonPadding * (i-15)) + (expButtonHeight * ((i-15) - 1)));
        expButton[i].set('y', (expButtonPadding * 4 + (expButtonSize * 3)));
    }
    else
    {
        expButton[i].set("x", 99999);
        expButton[i].set('y', 99999);   
    }

    //expButton[i].loadImage("{PROJECT_FOLDER}" + expansionNames[i] + "_button_base.png", "panel_" + expansionNames[i]); 
    //expButton[i].data.imagefile = "panel_" + expansionNames[i]; 



    //Load Image
    expButton[i].loadImage("{PROJECT_FOLDER}" + expansionNames[i] + "_button.jpg", "panel_" + expansionNames[i]); 
    expButton[i].data.imagefile = "panel_" + expansionNames[i]; 
    expButton[i].data.expansionName = expansionNames[i];
    expButton[i].set("allowCallbacks", "Clicks & Hover");
    expButton[i].setPaintRoutine(function(g) 
    {
        g.setColour(Colours.white);
        g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 0, 1.0);
        g.setFont("Arial", 12.0);
        g.drawAlignedText(this.data.expansionName, [0, 0, this.getWidth(), this.getHeight()], "centred");        
        g.drawImage(this.data.imagefile, [0, 0, expButtonHeight, expButtonHeight], 0, 0); 
    });
    
    expButton[i].setLoadingCallback(function(isPreloading)
    {
        if(isPreloading)
        {       
            this.data.preload = true;
        }
        else
        {       
            this.data.preload = false;
        }
    });      
    
    expButton[i].setMouseCallback(function(event)
    {
        if (event.clicked)
        {
            //Here we add the safety check.
            
            if (this.data.preload == false)
            {
                expHandler.setCurrentExpansion(this.data.expansionName);   
                load+this.data.expansionName;
                this.setPaintRoutine(function(g) 
                {
                    g.drawImage(this.data.imagefile, [0, 0, expButtonHeight, expButtonHeight], 0, 0); 
                    /*
                    g.setColour(Colours.white);
                    g.setFont("Arial", 12.0);
                    g.drawAlignedText(this.data.expansionName, [0, 0, this.getWidth(), this.getHeight()], "centred");
                    */
                });
                Button_OpenExpansions.setValue(0);
                Button_OpenExpansions.changed();
            }
        }
        
        else if (event.mouseUp)
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, expButtonHeight, expButtonHeight], 0, 0); 
                /*
                g.setColour(Colours.white);
                g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 0, 1.0);
                g.setFont("Arial", 12.0);
                g.drawAlignedText(this.data.expansionName, [0, 0, this.getWidth(), this.getHeight()], "centred"); 
                */
            });                  
            
        else if (event.hover)
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, expButtonHeight, expButtonHeight], 0, 0); 
                g.setColour(Colours.withAlpha(Colours.black, 0.1));
                g.fillRoundedRectangle([0, 0, expButtonHeight, expButtonHeight], 0);
                /*
                g.setColour(Colours.white);
                g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 0, 1.0);
                g.setFont("Arial", 12.0);
                g.drawAlignedText(this.data.expansionName, [0, 0, this.getWidth(), this.getHeight()], "centred");                
                */
            });    
            
        else
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, expButtonHeight, expButtonHeight], 0, 0);
                /* 
                g.setColour(Colours.white);
                g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 0, 1.0);
                g.setFont("Arial", 12.0);
                g.drawAlignedText(this.data.expansionName, [0, 0, this.getWidth(), this.getHeight()], "centred");                 
                */
            });         
    });    
};

currentExpansion = expHandler.getCurrentExpansion();
currentExpansion = currentExpansion.Name;

var backgroundImage = "";
var panelImage = "";

var expansionDirectory = FileSystem.getFolder(FileSystem.Samples);
var selectExpansionFile = "";
reg hr;

expHandler.setAllowedExpansionTypes([expHandler.FileBased, 
                                     expHandler.Intermediate, 
                                     expHandler.Encrypted]);

//Position Panels

inline function positionLibraryPanel()
{
    Viewport_ExpansionsHolder.setPosition(0, 0, Panel_BG.get("width"), Panel_BG.get("height"));
    Panel_ExpansionsItemHolder.setPosition(0, 0, Panel_BG.get("width"), Panel_BG.get("height"));
}

//positionLibraryPanel();

//Open Panel

inline function onButton_OpenExpansionsControl(component, value)
{
    if (value)
        closePanels(Button_OpenExpansions);
    Viewport_ExpansionsHolder.showControl(value);
};

Content.getComponent("Button_OpenExpansions").setControlCallback(onButton_OpenExpansionsControl);

//Close Panel

inline function onButton_CloseExpansionsControl(component, value)
{
    if (value)
        closePanels("none");
};

Content.getComponent("Button_CloseExpansions").setControlCallback(onButton_CloseExpansionsControl);
