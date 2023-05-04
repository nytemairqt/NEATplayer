//Library Select

include("librarySelectModularMigration.js");

namespace libraryHandler
{
    const Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder"); 
    const Button_OpenExpansions = Content.getComponent("Button_OpenExpansions"); 
    const Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");
    const Button_CloseExpansions = Content.getComponent("Button_CloseExpansions");

    const Button_RestoreAllExpansionsFromBackup = Panel_ExpansionsItemHolder.addChildPanel();
    const Button_UpdateAllExpansions = Panel_ExpansionsItemHolder.addChildPanel();

    reg currentExpansion = expHandler.getCurrentExpansion().Name;
    reg libraryCurrentlyUpdating = "";
    reg expName;

    reg expansionList = expHandler.getExpansionList();
    const expansionNames = [];

    for (e in expansionList)
        expansionNames.push(e.getProperties().Name);

    const expButton = [];
    const buttonPadding = 19;
    const buttonSize = 176;

    reg JSONLibraryUpdateHandler;
    const BASE_URL = "https://dl.dropbox.com/s/";
    const JSON_URL = "4e4ltu41bjwwc9w/NEATPlayerLibraryHandler.json";
    const fileLibraryHandlerJSON = FileSystem.getFolder(FileSystem.AppData).getChildFile("NEATPlayerLibraryHandler.json");

    reg downloadCounter = 0;

    inline function buildMainButtons()
    {
        // Update

        Button_UpdateAllExpansions.set("width", 24);
        Button_UpdateAllExpansions.set("height", 24);
        Button_UpdateAllExpansions.set("x", 17);
        Button_UpdateAllExpansions.set("y", 7);
        Button_UpdateAllExpansions.set("allowCallbacks", "All Callbacks");
        Button_UpdateAllExpansions.set("tooltip", "Check for Library updates.");

        Button_UpdateAllExpansions.setMouseCallback(function(event)
        {
            this.data.mouseover = event.hover;

            if (event.clicked && SYSTEM_STATUS == 0) //safety check
                downloadLibraryHandler();

            this.repaint();
        });  

        // Restore

        Button_RestoreAllExpansionsFromBackup.set("width", 24);
        Button_RestoreAllExpansionsFromBackup.set("height", 24);
        Button_RestoreAllExpansionsFromBackup.set("x", 42);
        Button_RestoreAllExpansionsFromBackup.set("y", 7);
        Button_RestoreAllExpansionsFromBackup.set("allowCallbacks", "All Callbacks");
        Button_RestoreAllExpansionsFromBackup.set("tooltip", "Restore missing Libraries from Backups.");

        Button_RestoreAllExpansionsFromBackup.setMouseCallback(function(event)
        {
            this.data.mouseover = event.hover;        

            if (event.clicked && SYSTEM_STATUS == 0) //safety check
                restoreAllExpansionsFromBackup();

            this.repaint();
        });  
    }

    inline function populateLibraries()
    {
        local row_x = 0;
        local row_y = 0;

        for (i=0; i<expansionNames.length; i++)
        {   
            expButton[i] = Panel_ExpansionsItemHolder.addChildPanel();

            local button = expButton[i];

            button.set("width", buttonSize);
            button.set("height", buttonSize);
            button.data.index = i;

            if (row_x == 5)
            {
                row_y += 1; //Offset for next row
                row_x = 0; //Reset counter
            }

            button.set("x", buttonPadding + (buttonPadding * row_x) + (buttonSize * row_x));
            button.set("y", (2 * buttonPadding) + (buttonPadding * row_y) + (buttonSize * row_y));

            row_x++;

            local image = expansionList[i].getWildcardReference("button_image.jpg");

            button.loadImage(image, "panel_" + expansionNames[i]);
            button.data.imagefile = "panel_" + expansionNames[i]; 
            button.data.expansionName = expansionNames[i];
            button.set("allowCallbacks", "All Callbacks");

            button.setLoadingCallback(function(isPreloading)
            {
                this.data.preload = isPreloading;
            });      

            button.setMouseCallback(function(event)
            {
                this.data.mouseover = event.hover;
                
                if (event.clicked)
                    loadLibrary(); 
            
                this.repaint();
            });  

            button.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [0, 0, buttonSize, buttonSize], 0, 0);    

                if (this.data.mouseover)
                {
                    g.setColour(Colours.withAlpha(Colours.white, 0.1));
                    g.fillRoundedRectangle([0, 0, buttonSize, buttonSize], 0);
                }
            });
        }
    }

    inline function loadLibrary() // Assigned to individual Buttons
    {
        Console.print(this.data.expansionName);
        expHandler.setCurrentExpansion(this.data.expansionName);   
        load+this.data.expansionName;
        Button_OpenExpansions.setValue(0);
        Button_OpenExpansions.changed();
    }

    // Expansion Loading

    function expCallback()
    { 
        currentExpansion = expHandler.getCurrentExpansion();
        manifest = currentExpansion.loadDataFile("manifest.json");
        currentExpansion = currentExpansion.getProperties();
        currentExpansion = currentExpansion.Name;
        Console.print("Current Expansion: " + currentExpansion);

        loadExpansionFromManifest();

        expHandler.getCurrentExpansion().setAllowDuplicateSamples(1-Button_ExclusiveReverse.getValue());
    }

    expHandler.setExpansionCallback(expCallback);

    inline function backupExpansion(index, version)
    {
        local rootFolder = expansionList[index].getRootFolder();
        local backupFolder = rootFolder.createDirectory("Backup");
        local subfolderName = Engine.doubleToString(version, 1);
        subfolderName = subfolderName.replace(".", "_");
        local backupSubfolder = backupFolder.createDirectory(subfolderName);

        local hxiFile = rootFolder.getChildFile("info.hxi");
        hxiFile.move(backupSubfolder.getChildFile("info.hxi"));
    }

    inline function restoreAllExpansionsFromBackup()
    {
        updateSystemStatus(4);

        local expansionRoot = FileSystem.getFolder(FileSystem.AppData).getChildFile("Expansions");
        local expansionList = FileSystem.findFiles(expansionRoot, "*", false);

        for (i=0; i<expansionList.length; i++)
        {
            if (expansionList[i].isDirectory())
            {
                local hxiFile = expansionList[i].getChildFile("info.hxi");
                if (!hxiFile.isFile())
                {
                    local backup = expansionList[i].getChildFile("Backup");
                    if (backup.isDirectory())
                    {
                        local backupList = FileSystem.findFiles(backup, "*", false);
                        backupList.reverse();
                        local hxiBackup = backupList[0].getChildFile("info.hxi");

                        if (hxiBackup.isFile())
                            hxiBackup.copy(hxiFile);
                    }
                }
            }
        }
        Engine.showMessageBox("Restore Complete", "Library restoration is complete, please restart NEAT Player.", 0);
        updateSystemStatus(0);
    }   

    inline function downloadLibraryHandler()
    {
        updateSystemStatus(1);
        Server.setBaseURL(BASE_URL);
        // Safety Check
        if (fileLibraryHandlerJSON.isFile())
            fileLibraryHandlerJSON.deleteFileOrDirectory();

        if (!Server.isOnline())
        {
            Engine.showMessageBox("No Server Connection.", "Unable to connect to server.", 0);
            updateSystemStatus(0);
            return;
        }
        else
        {
            Server.cleanFinishedDownloads();
            Server.downloadFile(JSON_URL, {}, fileLibraryHandlerJSON, function()
            {
                if(this.data.finished && this.data.success)
                {
                    JSONLibraryUpdateHandler = fileLibraryHandlerJSON.loadAsObject();
                    updateLibraries();

                    if (fileLibraryHandlerJSON.isFile())
                        fileLibraryHandlerJSON.deleteFileOrDirectory();
                }
            });
        }
    }

    inline function updateLibraries()
    {            
        for (i=0; i < expansionList.length; i++)
        {
            local manifest = expansionList[i].loadDataFile("manifest.json");
            expName = expansionList[i].getProperties().Name;
            local hxiFile = expansionList[i].getRootFolder().getChildFile("info.hxi");          

            local name = expName; // lambda for download method

            if (isDefined(manifest) && manifest.version < JSONLibraryUpdateHandler[expName][0])
            {
                // Backup
                backupExpansion(i, manifest.version);

                // Download New Version
                Server.downloadFile(JSONLibraryUpdateHandler[expName][1], {}, hxiFile, function[name]()
                {   
                    // Tooltip
                    libraryCurrentlyUpdating = name;
                    updateSystemStatus(3);
              
                    if (this.data.finished && this.data.success)
                    {
                        Server.cleanFinishedDownloads();

                        if (Server.getPendingDownloads().length <= 1)
                        {
                            Engine.showMessageBox("Update Successful.", "Libraries were updated. Please restart NEAT Player.", 0);
                            libraryCurrentlyUpdating = "";
                            updateSystemStatus(0);
                        }                        
                    }                
                });
            }                           
        }  
    }

    //reg hr;

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

    // Paint Routines

    Button_UpdateAllExpansions.setPaintRoutine(function(g)
    {
        g.setColour(this.data.mouseover ? Colours.white : Colours.lightgrey);

        if (SYSTEM_STATUS == 1 || SYSTEM_STATUS == 3)
            g.setColour(Colours.lightblue);
        path.loadFromData(pathButtonCheckForUpdates);
        g.fillPath(path, [1, 1, this.getWidth() - 2, this.getHeight() - 2]);
    });

    Button_RestoreAllExpansionsFromBackup.setPaintRoutine(function(g)
    {
        g.setColour(this.data.mouseover ? Colours.white : Colours.lightgrey);
        if (SYSTEM_STATUS == 4)
            g.setColour(Colours.lightblue);
        path.loadFromData(pathRestoreFromBackup);
        g.drawPath(path, [7, 3, this.getWidth() - 14, this.getHeight() - 14], 2.0);
        g.fillRoundedRectangle([1, 17, this.getWidth() - 2, 6], 1.0);

        g.fillTriangle([this.getWidth() / 2 - 5, 0, 6, 6], Math.toRadians(270));

        //Little Extra Bits
        
        g.setColour(0xFB111111);
        g.fillRoundedRectangle([3, 18, 4, 4], 0.5);
        g.fillRoundedRectangle([8, 18, 4, 4], 0.5);
        g.fillRoundedRectangle([16, 20, 5, 2], 0.5);    
    });
} 

//end namespace

libraryHandler.buildMainButtons();
libraryHandler.populateLibraries();

