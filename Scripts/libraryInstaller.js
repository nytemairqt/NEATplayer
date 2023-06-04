namespace libraryInstaller
{
    const var Panel_InstallLibraries = Content.getComponent("Panel_InstallLibraries");
    const var Button_AddLibrary = Content.getComponent("Button_AddLibrary");

    const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
    const var Button_BulkInstall = Content.getComponent("Button_BulkInstall");

    const var Button_CloseInstallPanel = Content.getComponent("Button_CloseInstallPanel");

    reg nest = {};
    const hrList = [];

    Button_InstallLibrary.set("tooltip", "Install a single Library (.hr1 File).");
    Button_BulkInstall.set("tooltip", "Install multiple Libraries (.hr1 Files) from a Folder.");

    //Open Panel

    inline function onButton_AddLibraryControl(component, value)
    {
        if (value)
            closePanels(Button_AddLibrary);
        Panel_InstallLibraries.showControl(value);
    };

    Content.getComponent("Button_AddLibrary").setControlCallback(onButton_AddLibraryControl);

    //Close Panel

    inline function onButton_CloseInstallPanelControl(component, value)
    {
        if (value)
            closePanels("none");
    };

    Content.getComponent("Button_CloseInstallPanel").setControlCallback(onButton_CloseInstallPanelControl);

    //Library Installation

    //Global Installation Callback

    var numExpansionsToInstall;
    var expansionInstallIndex = 1;
    var expansionInstallName;

    function expansionInstallCallback(obj)
    {
        expansionInstallName = obj.SourceFile;
            if(obj.Status == 2 && isDefined(obj.Expansion))
            {
                if (expansionInstallIndex >= numExpansionsToInstall)
                {
                    expansionInstallIndex = 1;
                    Engine.showMessageBox("Installation Complete", "Library installation successful, please restart NEAT Player.", 0);
                }
                else
                    expansionInstallIndex++;
            }

            
    }

    expHandler.setInstallCallback(expansionInstallCallback);

    //Single

    inline function onButton_InstallLibraryControl(component, value)
    {
       if (value)
           {
            Engine.showYesNoWindow("Install Library", "Please select the .hr1 file.", function(response)
            {
                if (!response) 
                    return;
       
                FileSystem.browse(FileSystem.Downloads, false, "*.hr1", function(f)
                {
                    nest.hr = f;
                    
                    if (f.isFile())
                    {
                        Engine.showYesNoWindow("Target Directory", "Please select the folder to install the samples to.", function(response)
                        {
                            if (!response) return;
       
                            FileSystem.browseForDirectory(FileSystem.Downloads, function(dir)
                            {
                                if (dir.isDirectory())
                                {
                                    numExpansionsToInstall = 1;
                                    expansionInstallIndex = 1;
                                    expHandler.installExpansionFromPackage(nest.hr, dir);
                                }
                            });
                        });
                    }
                });
            });
           }
    };

    Content.getComponent("Button_InstallLibrary").setControlCallback(onButton_InstallLibraryControl);

    //Bulk

    inline function onButton_BulkInstallControl(component, value)
    {
        if (value)
               {
                Engine.showYesNoWindow("Bulk Install", "Please select the folder containing the .hr1 files.", function(response)
                {
                    if (!response) return;
           
                    FileSystem.browseForDirectory(FileSystem.Downloads, function(f)
                    {
                        if (f.isDirectory())
                        {
                            hrList = FileSystem.findFiles(f, "*.hr1", 0);
                            Engine.showYesNoWindow("Target Directory", "Please select the folder to install the samples to.", function(response)
                            {
                                if (!response) return;
           
                                FileSystem.browseForDirectory(FileSystem.Downloads, function(dir)
                                {                            
                                    if (dir.isDirectory())
                                    {
                                        numExpansionsToInstall = hrList.length;
                                        expansionInstallIndex = 1;
                                        for (i=0; i<hrList.length; i++)   
                                        {
                                            expHandler.installExpansionFromPackage(hrList[i], dir);                                          
                                        }  
                                            
                                    }
                                });
                            });
                        }
                    });
                });
               }
    };

    Content.getComponent("Button_BulkInstall").setControlCallback(onButton_BulkInstallControl);

    //Paint Routine

    Panel_InstallLibraries.setPaintRoutine(function(g)
    {
        g.setColour(Colours.withAlpha(Colours.black, 0.82));
        g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0);

        g.setColour(Colours.withAlpha(Colours.white, .9));

        g.setFont("Arial Bold", 14);
        g.drawAlignedText("TO ADD A LIBRARY:", [this.getWidth() / 2, 80, 500, 50], "left");
        g.drawAlignedText("TO REMOVE A LIBRARY:", [this.getWidth() / 2, 220, 500, 50], "left");    

        g.setFont("Arial", 14);
        g.drawAlignedText("1. Navigate to extracted Library .hr1 file (or folder for Bulk Install).", [this.getWidth() / 2, 130, 500, 50], "left");
        g.drawAlignedText("2. Select Destination Folder.", [this.getWidth() / 2, 150, 500, 50], "left");
        g.drawAlignedText("3. Restart the Plugin once Installation finishes.", [this.getWidth() / 2, 170, 500, 50], "left");

        g.drawAlignedText("1. Delete Library .ch1 files inside Destination Folder.", [this.getWidth() / 2, 270, 500, 50], "left");
        g.drawAlignedText("2. Open AppData (Folder Button at the top of NEAT Player).", [this.getWidth() / 2, 290, 500, 50], "left");
        g.drawAlignedText("3. Delete NEAT Player/Expansions/{LIBRARYNAME} Folder.", [this.getWidth() / 2, 310, 500, 50], "left");
    });

}