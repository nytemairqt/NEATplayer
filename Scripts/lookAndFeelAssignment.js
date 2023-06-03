
    // Chaos Engine

    chaosEngine.Button_ChaosTypeA.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosA);
    chaosEngine.Button_ChaosTypeB.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosB);
    chaosEngine.Button_ChaosTypeC.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosC);
    chaosEngine.Button_ChaosTypeD.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosD);
    chaosEngine.Button_ChaosTypeE.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosE);
    chaosEngine.Button_ChaosTypeF.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosF);
    chaosEngine.Button_ChaosTypeG.setLocalLookAndFeel(LookAndFeel.LAFButtonChaosG);
    chaosEngine.Button_ChaosBypass.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerBypass);    

    // Change Page Buttons

    libraryHandler.Button_OpenExpansions.setLocalLookAndFeel(LookAndFeel.LAFButtonChangePage);
    Button_SampleDisplay.setLocalLookAndFeel(LookAndFeel.LAFButtonChangePage);
    Button_FXDisplay.setLocalLookAndFeel(LookAndFeel.LAFButtonChangePage);
    ArpeggiatorScript.Button_ArpDisplay.setLocalLookAndFeel(LookAndFeel.LAFButtonChangePage);    
    MovementSettings.Button_MoveDisplay.setLocalLookAndFeel(LookAndFeel.LAFButtonChangePage);

    // Library Installer

    libraryInstaller.Button_InstallLibrary.setLocalLookAndFeel(LookAndFeel.LAFButtonInstallLibrary);
    libraryInstaller.Button_BulkInstall.setLocalLookAndFeel(LookAndFeel.LAFButtonBulkInstall);
    libraryInstaller.Button_AddLibrary.setLocalLookAndFeel(LookAndFeel.LAFButtonAddLibrary);

    // Update Handler

    updateHandler.Button_UpdateNEATPlayer.setLocalLookAndFeel(LookAndFeel.LAFButtonUpdate);
    updateHandler.Button_ClosePatchNotes.setLocalLookAndFeel(LookAndFeel.LAFButtonClose);
    updateHandler.Button_DownloadLatestVersion.setLocalLookAndFeel(LookAndFeel.LAFButtonDownloadLatestVersion);

    // NEAT Player Settings

    NEATPlayerSettings.Button_CustomSettings.setLocalLookAndFeel(LookAndFeel.LAFButtonSettings);
    NEATPlayerSettings.Button_OpenAppData.setLocalLookAndFeel(LookAndFeel.LAFButtonAppData);
    NEATPlayerSettings.Button_PortamentoBypass.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    NEATPlayerSettings.Button_ExclusiveReverse.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    NEATPlayerSettings.Button_DynamicPurge.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    NEATPlayerSettings.Button_OpenShop.setLocalLookAndFeel(LookAndFeel.LAFButtonOpenShop);    

    // Close Buttons

    const closeButtons = [Content.getComponent("Button_CloseCustomSettings"),
                          Content.getComponent("Button_CloseInstallPanel"),
                          Content.getComponent("Button_PresetBrowserClose"),
                          Content.getComponent("Button_CloseExpansions"),
                          Content.getComponent("Button_CloseSamplePanel"),
                          Content.getComponent("Button_CloseFXPanel"),
                          Content.getComponent("Button_CloseArpPanel"),
                          Content.getComponent("Button_CloseMovementPanel")];


    for (c in closeButtons)
        c.setLocalLookAndFeel(LookAndFeel.LAFButtonClose);

    Button_CloseRandomizationPanel.setLocalLookAndFeel(LookAndFeel.LAFButtonCloseRandomizationPanel);

    //Sampler

    Button_SamplerABypass.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerBypass);
    Button_SamplerBBypass.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerBypass);
    Button_SamplerCBypass.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerBypass);

    Button_SamplerAShowADSR.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerShowADSR);
    Button_SamplerBShowADSR.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerShowADSR);
    Button_SamplerCShowADSR.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerShowADSR);

    Button_SamplerAReverse.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerReverse);
    Button_SamplerBReverse.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerReverse);
    Button_SamplerCReverse.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerReverse);

    Button_SamplerAComboBoxUp.setLocalLookAndFeel(LookAndFeel.LAFButtonUpArrow);
    Button_SamplerAComboBoxDown.setLocalLookAndFeel(LookAndFeel.LAFButtonDownArrow);
    Button_SamplerBComboBoxUp.setLocalLookAndFeel(LookAndFeel.LAFButtonUpArrow);
    Button_SamplerBComboBoxDown.setLocalLookAndFeel(LookAndFeel.LAFButtonDownArrow);
    Button_SamplerCComboBoxUp.setLocalLookAndFeel(LookAndFeel.LAFButtonUpArrow);
    Button_SamplerCComboBoxDown.setLocalLookAndFeel(LookAndFeel.LAFButtonDownArrow);

    Slider_SampleOffsetA.setLocalLookAndFeel(LookAndFeel.LAFSliderSampleOffset);
    Slider_SampleOffsetB.setLocalLookAndFeel(LookAndFeel.LAFSliderSampleOffset);
    Slider_SampleOffsetC.setLocalLookAndFeel(LookAndFeel.LAFSliderSampleOffset);

    for (r in randomizationButtonsSampler)
        r.setLocalLookAndFeel(LookAndFeel.LAFButtonRandomize);

    ComboBox_SamplerA.setLocalLookAndFeel(LookAndFeel.LAFComboBoxSampler);
    ComboBox_SamplerB.setLocalLookAndFeel(LookAndFeel.LAFComboBoxSampler);
    ComboBox_SamplerC.setLocalLookAndFeel(LookAndFeel.LAFComboBoxSampler);

    //FX

    for (f in listFXButtonsLeft)
        f.setLocalLookAndFeel(LookAndFeel.LAFButtonFXSettings);

    for (f in listFXButtonsRight)
        f.setLocalLookAndFeel(LookAndFeel.LAFButtonFXSettings);

    for (f in FXBypassButtons)
        f.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerBypass);

    for (l in listRandomizationButtonsFXBypass)
        l.setLocalLookAndFeel(LookAndFeel.LAFButtonRandomize);

    for (l in listRandomizationButtonsFX)
        l.setLocalLookAndFeel(LookAndFeel.LAFButtonRandomize);

    Button_AmpCabBypass.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    Button_AmpHQ.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    Button_AmpComboBoxUp.setLocalLookAndFeel(LookAndFeel.LAFButtonUpArrow);
    Button_AmpComboBoxDown.setLocalLookAndFeel(LookAndFeel.LAFButtonDownArrow);

    Button_StutterLFOPreFX.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    Button_StutterLFOSync.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    Button_DelayLink.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    Button_DelaySync.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    // Arpeggiator

    ArpeggiatorScript.Button_ArpBypass.setLocalLookAndFeel(LookAndFeel.LAFButtonSamplerBypass);

    ArpeggiatorScript.Button_ArpNotesMinor.setLocalLookAndFeel(LookAndFeel.LAFArpMinorButton);
    ArpeggiatorScript.Button_ArpNotesMajor.setLocalLookAndFeel(LookAndFeel.LAFArpMajorButton);
    ArpeggiatorScript.Button_ArpNotesReset.setLocalLookAndFeel(LookAndFeel.LAFArpResetButton);
    ArpeggiatorScript.Button_ArpNotesInvert.setLocalLookAndFeel(LookAndFeel.LAFArpInvertButton);

    ArpeggiatorScript.Button_ArpVelocityReset.setLocalLookAndFeel(LookAndFeel.LAFArpResetButton);
    ArpeggiatorScript.ArpeggiatorScript.Button_ArpLengthReset.setLocalLookAndFeel(LookAndFeel.LAFArpResetButton);

    ArpeggiatorScript.Button_ArpSustain.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    ArpeggiatorScript.Button_ArpModeUpArrow.setLocalLookAndFeel(LookAndFeel.LAFButtonUpArrow);
    ArpeggiatorScript.Button_ArpModeDownArrow.setLocalLookAndFeel(LookAndFeel.LAFButtonDownArrow);

    for (r in randomizationButtonsArp)
        r.setLocalLookAndFeel(LookAndFeel.LAFButtonRandomize);

    // Movement

    MovementSettings.Button_MovementSettings.setLocalLookAndFeel(LookAndFeel.LAFButtonSettingsCogwheel);
    MovementSettings.Button_MovementSettingsClose.setLocalLookAndFeel(LookAndFeel.LAFButtonClose);
    MovementSettings.Slider_MovementXInvisible.setLocalLookAndFeel(LookAndFeel.LAFSliderMovementX);
    MovementSettings.Slider_MovementYInvisible.setLocalLookAndFeel(LookAndFeel.LAFSliderMovementY);

    // Miscellaneous

    Button_OpenPresetBrowser.setLocalLookAndFeel(LookAndFeel.LAFButtonPresetBrowser);
    Button_RandomizationButtonsVisibility.setLocalLookAndFeel(LookAndFeel.LAFButtonRandomizeVisibility);
    Button_OpenRandomizePanel.setLocalLookAndFeel(LookAndFeel.LAFButtonOpenRandomizationPanel);

    // Main Sliders

    const var mainSliders = Content.getAllComponents("Slider*");
    const var otherSliders = [Slider_SampleOffsetA, 
                              Slider_SampleOffsetB, 
                              Slider_SampleOffsetC, 
                              Slider_MovementXInvisible, 
                              Slider_MovementYInvisible, 
                              Slider_OutputGain];

    for (o=0; o<otherSliders.length; o++)
        mainSliders.remove(otherSliders[o]);

    for (m in mainSliders)
        m.setLocalLookAndFeel(LookAndFeel.LAFSliderMain);

    Slider_OutputGain.setLocalLookAndFeel(LookAndFeel.LAFSliderOutputGain);    

    //Extra Expansion Specific Controls

    //Achromic

    extrasAchromic.Button_AchromicPickAttack.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    extrasAchromic.Button_AchromicReleaseNoise.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    extrasAchromic.Button_AchromicNoiseGate.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    extrasAchromic.Button_AchromicForceDownpick.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    //Cloudburst Acoustic

    extrasCloudburstAcoustic.Button_CloudburstAcousticNoises.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    //Gloom

    extrasGloom.Button_GloomChairCreakNoise.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    extrasGloom.Button_GloomReleaseNoise.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    //PDQ Bass

    extrasPDQBass.Button_PDQBassForceDownpick.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);
    extrasPDQBass.Button_PDQBassProcessed.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    extrasPDQBass.Slider_PDQBassVelocityMin.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassVelocityMax.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassPMVelMin.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassPMVelMax.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassFVelMin.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassFVelMax.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassAPVelMin.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassAPVelMax.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassSLVelMin.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);
    extrasPDQBass.Slider_PDQBassSLVelMax.setLocalLookAndFeel(LookAndFeel.LAFSliderPDQBassVel);

    //Portal

    extrasPortal.Button_PortalIgnoreArpVelocity.setLocalLookAndFeel(LookAndFeel.LAFButtonBypass);

    //Preset Browser

    FloatingTile_PresetBrowser.setLocalLookAndFeel(LookAndFeel.LAFPresetBrowser);

    //Arpeggiator    

    ArpeggiatorScript.SliderPack_ArpNotes.setLocalLookAndFeel(LookAndFeel.LAFSliderPackArpNotes);
    ArpeggiatorScript.SliderPack_ArpVelocity.setLocalLookAndFeel(LookAndFeel.LAFSliderPackArpOther);
    ArpeggiatorScript.SliderPack_ArpLength.setLocalLookAndFeel(LookAndFeel.LAFSliderPackArpOther);