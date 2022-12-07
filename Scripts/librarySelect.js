//Library Select

var currentExpansion; 

const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder"); 
const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions"); 
const var Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");
const var Button_CloseExpansions = Content.getComponent("Button_CloseExpansions");

const var expansionNames = [];

for (e in expHandler.getExpansionList())
    expansionNames.push(e.getProperties().Name);

const var expButton = [];

const var expButtonPadding = 19;
const var expButtonHeight = 176;
const var expButtonSize = 176;

const var expPanelTitle = Panel_ExpansionsItemHolder.addChildPanel();
expPanelTitle.setPosition(0, 0, Panel_ExpansionsItemHolder.getWidth(), 20);
expPanelTitle.setPaintRoutine(function(g)
{
    g.fillAll(0x1B1B1B);
    g.setFont("Arial", 12.0);
    g.setColour(Colours.white);
    g.drawAlignedText("- Libraries -", [0 , 0, Panel_ExpansionsItemHolder.getWidth(), 20], "centred");
});
    
//Expansion Buttons    

var num_rows = expansionNames.length / 5; //5 Items per row.
var row_x = 0;
var row_y = 0;
    
for (i=0; i<expansionNames.length; i++) // For each found Expansion
{
    expButton[i] = Panel_ExpansionsItemHolder.addChildPanel(); // Add a child panel
    expButton[i].set("width", expButtonSize);
    expButton[i].set("height", expButtonSize);

    if (row_x == 5)
    {
        row_y += 1; //Offset for next row
        row_x = 0; //Reset counter
    }

    expButton[i].set("x", expButtonPadding + (expButtonPadding * row_x) + (expButtonSize * row_x));
    expButton[i].set("y", expButtonPadding + (expButtonPadding * row_y) + (expButtonSize * row_y));

    row_x++;

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
        g.drawImage(this.data.imagefile, [0, 0, expButtonSize, expButtonSize], 0, 0); 
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
                    g.drawImage(this.data.imagefile, [0, 0, expButtonSize, expButtonSize], 0, 0); 
                });
                Button_OpenExpansions.setValue(0);
                Button_OpenExpansions.changed();
            }
        }
        
        else if (event.mouseUp)
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, expButtonSize, expButtonSize], 0, 0); 
            });                  
        
        
        else if (event.hover)
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, expButtonSize, expButtonSize], 0, 0); 
                g.setColour(Colours.withAlpha(Colours.black, 0.1));
                g.fillRoundedRectangle([0, 0, expButtonSize, expButtonSize], 0);
            });    
            
        else
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, expButtonSize, expButtonSize], 0, 0);
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
