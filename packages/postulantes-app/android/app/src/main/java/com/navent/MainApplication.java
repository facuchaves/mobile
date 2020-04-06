package com.navent;

import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.rnfs.RNFSPackage; 
import com.apsl.versionnumber.RNVersionNumberPackage; 
import com.reactnativecommunity.netinfo.NetInfoPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List; 

public class MainApplication extends NavigationApplication {
      
      @Override
      protected ReactGateway createReactGateway() {
          ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
              @Override
              protected String getJSMainModuleName() {
                  return "index";
              }
          };
          return new ReactGateway(this, isDebug(), host);
      }
  
      @Override
      public boolean isDebug() {
          return BuildConfig.DEBUG;
      }
  
      protected List<ReactPackage> getPackages() {
          // Add additional packages you require here
          // No need to add RnnPackage and MainReactPackage
          return Arrays.<ReactPackage>asList(
              // eg. new VectorIconsPackage()
                  new ReactNativeConfigPackage(),
                  new AsyncStoragePackage(),
                  new ReactNativeRestartPackage(),
                  new PickerPackage(),
                  new RNFSPackage(),
                  new ReactVideoPackage(),
                  new RNVersionNumberPackage(),
                  new NetInfoPackage()
          );
      }
    
      @Override
      public List<ReactPackage> createAdditionalReactPackages() {
          return getPackages();
      }
  }