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
    g.setFont("Arial Bold", 13.0);
    g.setColour(Colours.withAlpha(Colours.white, .9));
    g.drawAlignedText("LIBRARIES", [0 , 6, Panel_ExpansionsItemHolder.getWidth(), 20], "centred");
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
var downloadCount = 0;
var downloadURLs = [];
var downloadTargets = [];
var hasCheckedForUpdates = false;

var download_target;

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

    Server.setBaseURL("https://storage.googleapis.com/iamlamprey-instruments/_ExpansionHXIs/");

    local thisButton = this;
    currentlyDownloading = true;
    currentlyDownloadingName = expansionNames[thisButton.data.index];
    loadingBar.startTimer(50);

    //Server.downloadFile(library_names[this.data.index] +".hxi", {}, download_target, function[thisButton]() 

    //local url = "";

    if (library_is_premodular[this.data.index])
        url = migration_list_urls_JSON[expansionNames[this.data.index]];
    else
        url = library_names[this.data.index] +".hxi";

    Server.downloadFile(url, {}, download_target, function[thisButton]() 
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

inline function startNextDownload(url)
{
    Server.downloadFile(url, {}, downloadTargets[downloadCount], function[thisButton]() 
    {
        currentlyDownloadingName = downloadURLs[downloadCount];
        if (this.data.finished)
            if (downloadCount < downloadURLs.length - 1)
            {
                downloadCount++;
                startNextDownload(downloadURLs[downloadCount]);
            }
            else
            {
                Engine.showMessageBox("Update Complete", "All Libraries updated successfully.  Please restart NEAT Player.", 0);
                Server.cleanFinishedDownloads();
                currentlyDownloading = false;
            }
    });
}

inline function updateAllExpansions()
{
    if (hasCheckedForUpdates)
    {
        Server.cleanFinishedDownloads();
        downloadURLs.clear();
        downloadTargets.clear();
        currentlyDownloading = true;
        loadingBar.startTimer(50);
        Server.setBaseURL("https://storage.googleapis.com/iamlamprey-instruments/_ExpansionHXIs/");
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

                download_target = expansionList[i].getRootFolder().getChildFile("info.hxi");
                downloadTargets.push(download_target);

                //Copy old .hxi to backup folder
                download_target.move(backup_version_subfolder.getChildFile("info.hxi"));

                local thisButton = expButton[i];            

                if (library_is_premodular[i])
                    downloadURLs.push(migration_list_urls_JSON[expansionNames[i]]);
                else
                    downloadURLs.push(library_names[i] + ".hxi");

                //local url = "";

                /*
                if (library_is_premodular[i])
                    url = migration_list_urls_JSON[expansionNames[i]];
                else
                    url = library_names[i] +".hxi";
                */
                /*
                Server.downloadFile(url, {}, download_target, function[thisButton]() 
                {   

                    
                    currentlyDownloadingName = expansionNames[thisButton.data.index];

                    if (this.data.finished)
                    {
                        if (this.data.success)
                        {
                            thisButton.data.downloading = false;              
                            thisButton.repaint();
                            if (thisButton.data.index == (expansionNames.length - 1))
                            {                        
                                Engine.showMessageBox("Update Complete", "All Libraries updated successfully.  Please restart NEAT Player.", 0);
                                Server.cleanFinishedDownloads();
                                currentlyDownloading = false;
                            }
                        }
                        else
                        {
                            Engine.showMessageBox("Download timed out.", "Wow you are a dumb dumb!! XD", 0);
                        }
                    }
                    
                }); 
                */                      
            }
        }
        startNextDownload(downloadURLs[0]);
    }
    else
        Engine.showMessageBox("Please wait.", "Still checking for updates, please wait.", 0);
}

//Restore from Backups

inline function restoreAllExpansionsFromBackup()
{
    local expansions_root = FileSystem.getFolder(FileSystem.Expansions);
    local expansion_list = FileSystem.findFiles(expansions_root, "*", false); //ASTERISK YOU SNEAKY DEVIL

    for (i=0; i<expansion_list.length; i++)
    {
        if (expansion_list[i].isDirectory())
        {
            local hxi = expansion_list[i].getChildFile("info.hxi");
            if (!hxi.isFile()) //check if hxi exists.
            {
                Console.print("MISSING HXI: " + hxi.toString(0));
                Console.print("restoring from backup...");

                local backup = expansion_list[i].getChildFile("Backup");
                if (backup.isDirectory())
                {
                    Console.print("Found Backup Directory");
                    //get the last folder in the directory
                    local backup_list = FileSystem.findFiles(backup, "*", false);
                    local last_backup = backup_list[0];
                    local backup_hxi = last_backup.getChildFile("info.hxi");
                    if (backup_hxi.isFile())
                    {
                        Console.print("Found HXI!: " + backup_hxi.toString(0));
                        backup_hxi.copy(hxi);
                    }
                }
            }
        }
    }
    Engine.showMessageBox("Restore Complete", "Library restoration is complete, please restart NEAT Player.", 0);
}

const var Button_RestoreAllExpansionsFromBackup = Panel_ExpansionsItemHolder.addChildPanel();
Button_RestoreAllExpansionsFromBackup.set("width", 24);
Button_RestoreAllExpansionsFromBackup.set("height", 24);
Button_RestoreAllExpansionsFromBackup.set("x", 42);
Button_RestoreAllExpansionsFromBackup.set("y", 7);
Button_RestoreAllExpansionsFromBackup.set("allowCallbacks", "All Callbacks");
Button_RestoreAllExpansionsFromBackup.set("tooltip", "Restore missing Libraries from Backup.");

Button_RestoreAllExpansionsFromBackup.setPaintRoutine(function(g)
{
    g.setColour(Colours.withAlpha(Colours.white, .8));
    path.loadFromData(pathRestoreFromBackup);
    g.drawPath(path, [7, 3, this.getWidth() - 14, this.getHeight() - 14], 2.0);
    g.fillRoundedRectangle([1, 17, this.getWidth() - 2, 6], 1.0);

    g.fillTriangle([this.getWidth() / 2 - 5, 0, 6, 6], Math.toRadians(270));

    //Little Extra Bits
    
    g.setColour(Colours.withAlpha(Colours.black, .8));
    g.fillRoundedRectangle([3, 18, 4, 4], 0.5);
    g.fillRoundedRectangle([8, 18, 4, 4], 0.5);
    g.fillRoundedRectangle([16, 20, 5, 2], 0.5);    

    //Mouseover
    g.setColour(this.data.mouseover ? Colours.withAlpha(Colours.white, .2) : Colours.withAlpha(Colours.white, .0));
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0);    
});

Button_RestoreAllExpansionsFromBackup.setMouseCallback(function(event)
{
    this.data.mouseover = event.hover;        

    if (event.clicked)
        restoreAllExpansionsFromBackup();

    this.repaint();
});  

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
    g.setColour(Colours.withAlpha(Colours.black, .8));
    g.fillRoundedRectangle([1, 1, this.getWidth() - 2, this.getHeight() - 2], 2.0);

    g.setColour(Colours.withAlpha(Colours.white, .8));
    path.loadFromData(pathButtonBulkInstall);
    g.fillPath(path, [1, 1, this.getWidth() - 2, this.getHeight() - 2]);

    //Little Extra Bits
    
    g.setColour(Colours.withAlpha(Colours.black, .8));
    g.fillRoundedRectangle([3, 18, 4, 4], 0.5);
    g.fillRoundedRectangle([8, 18, 4, 4], 0.5);
    g.fillRoundedRectangle([16, 20, 5, 2], 0.5);    

    //Mouseover
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

            if (library_outdatedVersions.length == expansionList.length) //enable updating when finished check
                hasCheckedForUpdates = true;
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
