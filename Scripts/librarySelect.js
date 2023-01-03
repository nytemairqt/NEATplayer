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
var library_currentVersions = [];
var library_latestVersions = [];
var library_names = [];
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
var currentlyDownloading = false;
var currentlyDownloadingName = "";

var download_target;
var new_download_target;

inline function updateExpansion()
{
    //Create Backup Folder
    local root_folder = expHandler.getExpansion(expansionNames[this.data.index]).getRootFolder();
    local backup_folder = root_folder.createDirectory("Backup");
    if (library_is_premodular[this.data.index])
        local subfolder_string = "_PreModular";
    else
        local subfolder_string = Engine.doubleToString(library_unloadedManifest.version, 1);
    subfolder_string = subfolder_string.replace(".", "_");
    local backup_version_subfolder = backup_folder.createDirectory(subfolder_string);

    //First clean the download list.
    this.data.downloading = true;

    download_target = expHandler.getExpansion(expansionNames[this.data.index]).getRootFolder().getChildFile("info.hxi");

    //Move old .hxi to backup folder
    download_target.move(backup_version_subfolder.getChildFile("info.hxi"));

    Server.setBaseURL("https://github.com/nytemairqt/libraries/raw/main/");

    local thisButton = this;
    currentlyDownloading = true;
    currentlyDownloadingName = expansionNames[thisButton.data.index];
    loadingBar.startTimer(50);

    new_download_target = expHandler.getExpansion(expansionNames[this.data.index]).getRootFolder().getChildFile(library_names[this.data.index]+".hxi");

    Server.downloadFile(library_names[this.data.index]+".hxi", {}, download_target, function[thisButton]() 
    {
        currentlyDownloading = 1-this.data.finished;
        if (this.data.finished && this.data.success)         
        {
            Engine.showMessageBox("Update Complete", expansionNames[thisButton.data.index] + " updated successfully.  Please restart NEAT Player.", 0);
            thisButton.data.downloading = false;              
            thisButton.repaint();
        }              
    });
}

inline function loadExpansion()
{
    expHandler.setCurrentExpansion(this.data.expansionName);   
    load+this.data.expansionName;
    Button_OpenExpansions.setValue(0);
    Button_OpenExpansions.changed();
}

inline function updateAllExpansions()
{
    currentlyDownloading = true;
    loadingBar.startTimer(50);
    for (i=0; i<expansionNames.length; i++)
    {
        if (library_outdatedVersions[i])
        {
            //Create backup Folder           
            local root_folder = expansionList[i].getRootFolder();
            local backup_folder= root_folder.createDirectory("Backup");
            if (library_is_premodular[index])
                local subfolder_string = "_PreModular";
            else
                local subfolder_string = Engine.doubleToString(library_currentVersions[i], 1);
            subfolder_string = subfolder_string.replace(".", "_");
            local backup_version_subfolder = backup_folder.createDirectory(subfolder_string);

            //Clean Download List
            expButton[i].data.downloading = true;

            local download_target = expansionList[i].getRootFolder().getChildFile("info.hxi");

            //Copy old .hxi to backup folder
            download_target.move(backup_version_subfolder.getChildFile("info.hxi"));

            Server.setBaseURL("https://github.com/nytemairqt/libraries/raw/main/");

            local thisButton = expButton[i];

            Server.downloadFile(library_names[this.data.index]+".hxi", {}, download_target, function[thisButton]() 
            {           
                currentlyDownloadingName = expansionNames[thisButton.data.index];

                if (this.data.finished && thisButton.data.index == (expansionNames.length - 1))
                    currentlyDownloading = false;

                if (this.data.finished && this.data.success)         
                {
                    thisButton.data.downloading = false;              
                    thisButton.repaint();

                    if (thisButton.data.index == (expansionNames.length - 1))
                    {
                        Server.cleanFinishedDownloads();
                        Engine.showMessageBox("Update Complete", "All Libraries updated successfully.  Please restart NEAT Player.", 0);
                    }
                }            
            });                
        }
    }
}

//Update All Expansions

const var Button_UpdateAllExpansions = Panel_ExpansionsItemHolder.addChildPanel();
Button_UpdateAllExpansions.set("width", 24);
Button_UpdateAllExpansions.set("height", 24);
Button_UpdateAllExpansions.set("x", 17);
Button_UpdateAllExpansions.set("y", 7);
Button_UpdateAllExpansions.set("allowCallbacks", "All Callbacks");
Button_UpdateAllExpansions.set("tooltip", "Update all Libraries.");

Button_UpdateAllExpansions.setPaintRoutine(function(g)
{
    g.setColour(Colours.withAlpha(Colours.white, .9));
    path.loadFromData(pathButtonBulkInstall);
    g.fillPath(path, [2, 3, this.getWidth() - 4, this.getHeight() - 6]);

    g.setColour(Colours.withAlpha(Colours.black, .9));

    //Small Details:
    g.fillRoundedRectangle([3, this.getHeight() - 7, 3, 3], 1.0);
    g.fillRoundedRectangle([7, this.getHeight() - 7, 3, 3], 1.0);
    g.fillRoundedRectangle([15, this.getHeight() - 6, 6, 2], 1.0);

    g.setColour(this.data.mouseover ? Colours.withAlpha(Colours.white, .2) : Colours.withAlpha(Colours.white, .0));
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0);    
});

Button_UpdateAllExpansions.setMouseCallback(function(event)
{
    this.data.mouseover = event.hover;        

    if (event.clicked)
        updateAllExpansions();

    this.repaint();
});  

//Expansion Buttons
    
for (i=0; i<expansionNames.length; i++) // For each found Expansion
{

    //Version Control via Manifest file.

    //Check for existing Manifest File (V1.0 -> V2.0 Update)

    library_unloadedManifest = expansionList[i].loadDataFile("manifest.json");
    library_currentVersions.push(library_unloadedManifest.version);
    library_is_premodular.push(false);

    if (!library_unloadedManifest) //Pre-Modular Migration
    {
        library_outdatedVersions[i] = true;
        library_is_premodular[i] = true;
        library_currentVersions[i] = 0.0;
    }
    else //Update Normally
    {
        library_names.push(library_unloadedManifest.library);
        var library_currentVersion = library_unloadedManifest.version;

        //Scrape Product Page

        Server.setBaseURL("https://www.iamlamprey.com");

        Server.callWithGET(library_unloadedManifest.productPage, "", function(status, response)
        {       
            library_responseArray = response.split(" ");
            
            library_responseAsString = library_responseArray.indexOf("Version:");
            
            library_latestVersion = library_responseArray[library_responseAsString + 1];
            
            library_latestVersion = library_latestVersion.replace(library_latestVersion.substring(4, 6), "");
            library_latestVersion = library_latestVersion.substring(0, 3);
            
            library_latestVersion = Math.range(library_latestVersion, 0.00, 99.99);

            library_latestVersions.push(library_latestVersion);

            library_outdatedVersions.push(library_currentVersion < library_latestVersion ? true : false);             
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

        if (library_outdatedVersions[this.data.index] == true && !library_is_premodular[this.data.index])
        {
            g.setColour(Colours.withAlpha(Colours.black, .8));
            g.fillRoundedRectangle([expButtonSize-library_updateButtonSize, 0, library_updateButtonSize, library_updateButtonSize], 2.0);

            g.setColour(Colours.withAlpha(Colours.white, .8));
            library_updateButtonPath.loadFromData(pathButtonInstallLibrary);
            g.fillPath(library_updateButtonPath, [(expButtonSize-library_updateButtonSize) + 4, 6, library_updateButtonSize - 8, library_updateButtonSize - 12]);

            //Little Extra Bits

            g.setColour(Colours.withAlpha(Colours.black, .8));
            g.fillRoundedRectangle([(expButtonSize-library_updateButtonSize) + 5, 20, 3, 3], 2.0);
            g.fillRoundedRectangle([(expButtonSize-library_updateButtonSize) + 10, 20, 3, 3], 2.0);
            g.fillRoundedRectangle([(expButtonSize-library_updateButtonSize) + 18, 21, 6, 2], 2.0);
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

        if (library_is_premodular[this.data.index])
        {
            g.setColour(Colours.withAlpha(Colours.black, .8));
            g.fillRoundedRectangle([0, 0, expButtonSize, expButtonSize], 0);

            g.setColour(Colours.withAlpha(Colours.white, .8));
            library_updateButtonPath.loadFromData(pathButtonInstallLibrary);
            g.setColour(Colours.withAlpha(Colours.white, .8));
            g.fillPath(library_updateButtonPath, [68, 68, expButtonSize - 136, expButtonSize - 136]);

            //Little Extra Bits

            g.setColour(Colours.withAlpha(Colours.black, .86));
            g.fillRoundedRectangle([70, 99, 8, 8], 2.0);
            g.fillRoundedRectangle([80, 99, 8, 8], 2.0);
            g.fillRoundedRectangle([93, 102, 13, 5], 2.0);            
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

            if (!library_is_premodular[this.data.index])
            {
                if (library_outdatedVersions[this.data.index] && event.mouseDownX > (expButtonSize - library_updateButtonSize) && event.mouseDownY < library_updateButtonSize)
                    updateExpansion();
                
                else if (this.data.preload == false)
                    loadExpansion();
            }
            else
                updateExpansion();
        }

        if (event.hover)
        {
            if (!library_is_premodular[this.data.index])
            {
                if (library_outdatedVersions[this.data.index] && event.x > (expButtonSize - library_updateButtonSize) && event.y < library_updateButtonSize)
                {
                    this.set("tooltip", "Download latest version.");
                    this.data.hoverUpdateButton = true;                    
                }
                else
                {
                    this.data.hoverUpdateButton = false;
                    this.set("tooltip", "Load Library.");
                }
            }
            else
            {
                this.data.hoverUpdateButton = false;
                this.set("tooltip", "Library is deprecated, please click to Download latest version.");
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
