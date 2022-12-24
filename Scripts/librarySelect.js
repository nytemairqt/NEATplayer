//Library Select

include("librarySelectModularMigration.js");

var currentExpansion; 

const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder"); 
const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions"); 
const var Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");
const var Button_CloseExpansions = Content.getComponent("Button_CloseExpansions");

var expansionList = expHandler.getExpansionList();
const var expansionNames = [];

//for (e in expHandler.getExpansionList())
for (e in expansionList)
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
    g.setFont("Arial", 14.0);
    g.setColour(Colours.white);
    g.drawAlignedText("Libraries", [0 , 6, Panel_ExpansionsItemHolder.getWidth(), 20], "centred");
});
    
//Library Version Control & Select Buttons

var library_outdatedVersions = [];
var library_updateURLs = [];
var library_is_premodular = [];
var library_unloadedManifest;
var library_latestVersion;
var library_responseArray;
var library_responseAsString;
const var library_updateButton = [];
const var library_updateButtonSize = 30;
const var library_updateButtonPath = Content.createPath();

var num_rows = expansionNames.length / 5; //5 Items per row.
var row_x = 0;
var row_y = 0;
var expansion_button_image = "";
var selected_expansion;

inline function updateAllExpansions()
{
    /*
    for all expansions
    if expansion out of date
    call update function
    paint routine should be % fill respective to current loop iter
    */
}

//Update All Expansions

const var Button_UpdateAllExpansions = Panel_ExpansionsItemHolder.addChildPanel();
Button_UpdateAllExpansions.set("width", 100);
Button_UpdateAllExpansions.set("height", 26);
Button_UpdateAllExpansions.set("x", 100);
Button_UpdateAllExpansions.set("y", 6);
Button_UpdateAllExpansions.set("allowCallbacks", "All Callbacks");

Button_UpdateAllExpansions.setPaintRoutine(function(g)
{
    g.setColour(this.data.mouseover ? Colours.withAlpha(Colours.white, .8) : Colours.withAlpha(Colours.white, .6));
    //g.setColour(Colours.withAlpha(Colours.white, .8));
    g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0, 2.0);
    g.setFont("Arial", 13);
    g.drawAlignedText("Update All", [0, 0, this.getWidth(), this.getHeight()], "centred");
});

Button_UpdateAllExpansions.setMouseCallback(function(event)
    {
        this.data.mouseover = event.hover;        

        if (event.clicked)
            Console.print("Clicked!");

        this.repaint();
    });  


//Expansion Buttons
    
for (i=0; i<expansionNames.length; i++) // For each found Expansion
{

    //Version Control via Manifest file.

    //Check for existing Manifest File (V1.0 -> V2.0 Update)

    library_unloadedManifest = expansionList[i].loadDataFile("manifest.json");
    library_outdatedVersions.push(false);
    library_is_premodular.push(false);

    if (!library_unloadedManifest) //Pre-Modular Migration
    {
        library_outdatedVersions[i] = true;
        library_updateURLs.push(migration_list_urls[i]);
        library_is_premodular[i] = true;
    }
    else //Update Normally
    {
        library_updateURLs.push(library_unloadedManifest.updateURL);

        //Scrape Product Page

        Server.setBaseURL("https://www.iamlamprey.com");

        Server.callWithGET(library_unloadedManifest.productPage, "", function(status, response)
        {       
            library_responseArray = response.split(" ");
            
            library_responseAsString = library_responseArray.indexOf("Version:");
            
            library_latestVersion = library_responseArray[library_responseAsString + 1];
            
            library_latestVersion = library_latestVersion.replace(library_latestVersion.substring(4, 6), "");
            
            library_latestVersion = Math.range(library_latestVersion, 0.00, 99.99);

            library_outdatedVersions[i] = library_unloadedManifest.version < library_latestVersion; //Swap array values at index to True
        });
    }

    expButton[i] = Panel_ExpansionsItemHolder.addChildPanel(); // Add a child panel
    expButton[i].set("width", expButtonSize);
    expButton[i].set("height", expButtonSize);
    expButton[i].data.index = i;

    if (row_x == 5)
    {
        row_y += 1; //Offset for next row
        row_x = 0; //Reset counter
    }

    expButton[i].set("x", expButtonPadding + (expButtonPadding * row_x) + (expButtonSize * row_x));
    expButton[i].set("y", (2 * expButtonPadding) + (expButtonPadding * row_y) + (expButtonSize * row_y));

    row_x++;

    //Load Image

    selected_expansion = expHandler.getExpansion(expansionNames[i]);
    expansion_button_image = selected_expansion.getWildcardReference("button_image.jpg");

    expButton[i].loadImage(expansion_button_image, "panel_" + expansionNames[i]);
    expButton[i].data.imagefile = "panel_" + expansionNames[i]; 
    expButton[i].data.expansionName = expansionNames[i];
    expButton[i].set("allowCallbacks", "All Callbacks");
    expButton[i].data.mouseover = 0;
    expButton[i].data.hoverUpdateButton = 0;
    expButton[i].setPaintRoutine(function(g) 
    {
        g.drawImage(this.data.imagefile, [0, 0, expButtonSize, expButtonSize], 0, 0); 

        if (library_outdatedVersions[this.data.index] == true)
        {
            g.setColour(Colours.withAlpha(Colours.black, .8));
            g.fillRoundedRectangle([expButtonSize-library_updateButtonSize, 0, library_updateButtonSize, library_updateButtonSize], 2.0);

            if (!this.data.downloading)
            {            
                g.setColour(Colours.withAlpha(Colours.white, .8));
                library_updateButtonPath.loadFromData(pathButtonInstallLibrary);
                g.fillPath(library_updateButtonPath, [(expButtonSize-library_updateButtonSize) + 4, 6, library_updateButtonSize - 8, library_updateButtonSize - 12]);

                //Little Extra Bits

                g.setColour(Colours.withAlpha(Colours.black, .8));
                g.fillRoundedRectangle([(expButtonSize-library_updateButtonSize) + 5, 20, 3, 3], 2.0);
                g.fillRoundedRectangle([(expButtonSize-library_updateButtonSize) + 10, 20, 3, 3], 2.0);
                g.fillRoundedRectangle([(expButtonSize-library_updateButtonSize) + 18, 21, 6, 2], 2.0);
            }
            else
            {
                g.setColour(Colours.withAlpha(Colours.white, .8));
                g.fillEllipse([(expButtonSize - library_updateButtonSize) + (library_updateButtonSize / 2) - 10, (library_updateButtonSize / 2) - 2, 4, 4]);
                g.fillEllipse([(expButtonSize - library_updateButtonSize) + (library_updateButtonSize / 2) - 2, (library_updateButtonSize / 2) - 2, 4, 4]);
                g.fillEllipse([(expButtonSize - library_updateButtonSize) + (library_updateButtonSize / 2) + 6, (library_updateButtonSize / 2) - 2, 4, 4]);
            }

        }     

        if (this.data.mouseover)
        {
            g.setColour(Colours.withAlpha(Colours.white, 0.1));
            g.fillRoundedRectangle([0, 0, expButtonSize, expButtonSize], 0);
        }

        if (this.data.hoverUpdateButton)
        {
            g.setColour(Colours.withAlpha(Colours.white, 0.3));
            g.fillRoundedRectangle([expButtonSize-library_updateButtonSize, 0, library_updateButtonSize, library_updateButtonSize], 2.0);
        }
    });
    
    expButton[i].setLoadingCallback(function(isPreloading)
    {
        this.data.preload = isPreloading;
    });      
    
    expButton[i].setMouseCallback(function(event)
    {
        this.data.mouseover = event.hover;        

        if (event.clicked)
        {
            //First check if user clicked the Update Button:

            if (library_outdatedVersions[this.data.index] && event.mouseDownX > (expButtonSize - library_updateButtonSize) && event.mouseDownY < library_updateButtonSize)
            {
                Console.print("YEP");
                //Create Backup Folder
                var root_folder = expHandler.getExpansion(expansionNames[this.data.index]).getRootFolder();
                var backup_folder = root_folder.createDirectory("Backup");
                if (library_is_premodular[this.data.index])
                    var subfolder_string = "_PreModular";
                else
                    var subfolder_string = Engine.doubleToString(library_unloadedManifest.version, 1);
                subfolder_string = subfolder_string.replace(".", "_");
                var backup_version_subfolder = backup_folder.createDirectory(subfolder_string);

                //First clean the download list.
                this.data.downloading = true;

                var download_target = expHandler.getExpansion(expansionNames[this.data.index]).getRootFolder().getChildFile("info.hxi");

                //Move old .hxi to backup folder
                download_target.move(backup_version_subfolder.getChildFile("info.hxi"));

                Server.setBaseURL("https://storage.googleapis.com");

                var thisButton = this;

                Server.downloadFile(library_updateURLs[this.data.index], {}, download_target, function[thisButton]() 
                {
                    if (this.data.finished)         
                    {
                        Console.print("Finished");      
                        thisButton.data.downloading = false;              
                        thisButton.repaint();
                    }              
                });             
            }

            //Load Library
            //Here we add the safety check.
            
            else if (this.data.preload == false)
            {
                expHandler.setCurrentExpansion(this.data.expansionName);   
                load+this.data.expansionName;
                Button_OpenExpansions.setValue(0);
                Button_OpenExpansions.changed();
            }

        }

        if (event.hover)
        {
            if (library_outdatedVersions[this.data.index] && event.x > (expButtonSize - library_updateButtonSize) && event.y < library_updateButtonSize)
            {
                this.data.hoverUpdateButton = true;    
                this.set("tooltip", "Download latest version.");
            }
            else
            {
                this.data.hoverUpdateButton = false;
                this.set("tooltip", "Load Library.");
            }
        }

        this.repaint();
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
