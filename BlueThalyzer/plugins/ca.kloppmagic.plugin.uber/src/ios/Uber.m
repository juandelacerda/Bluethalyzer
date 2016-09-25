#import "Uber.h"
#import <Cordova/CDV.h>

    @implementation Uber

    - (void)requestWithUber:(CDVInvokedUrlCommand*)command
    {       
        CDVPluginResult* pluginResult = nil;
        
        NSDictionary *payloadDictionary = [command.arguments objectAtIndex:0];
	
		// Do something awesome - the app is installed! Launch App.
		
		//The URL for NSURL will contain additional parameters with predetermined address from and to
		
		NSString *clientId = payloadDictionary[@"clientId"];
		NSString *toLatitude = payloadDictionary[@"toLatitude"];
		NSString *toLongitude = payloadDictionary[@"toLongitude"];
		NSString *fromLatitude = payloadDictionary[@"fromLatitude"];
		NSString *fromLongitude = payloadDictionary[@"fromLongitude"];
		NSString *productId = payloadDictionary[@"productId"];
		NSString *fromAddress = payloadDictionary[@"fromAddress"];
		NSString *toAddress = payloadDictionary[@"toAddress"];
		NSString *fromNickname = payloadDictionary[@"fromNickname"];
		NSString *toNickname = payloadDictionary[@"toNickname"];
		NSString *queryString = [NSString stringWithFormat:@""];
		
		if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"uber://"]]) {
			queryString = [NSString stringWithFormat:@"uber://"];
		}
		else {
			queryString = [NSString stringWithFormat:@"https://m.uber.com/sign-up"];
		}

		queryString = [NSString stringWithFormat:@"%@?action=setPickup&dropoff[latitude]=%@&dropoff[longitude]=%@", 
								 queryString,
								 toLatitude,
								 toLongitude];
		
		if (fromLatitude != nil && fromLongitude != nil) {
			queryString = [NSString stringWithFormat:@"%@&pickup[latitude]=%@&pickup[longitude]=%@",
						   queryString,
						   fromLatitude,
						   fromLongitude];
		}

		if (productId != nil) {
			queryString = [NSString stringWithFormat: @"%@&product_id=%@",
						   queryString,
						   productId];
		}
		
		if (clientId != nil) {
			queryString = [NSString stringWithFormat:@"%@&client_id=%@",
						   queryString,
						   clientId];
		}
		
		if (fromAddress != nil) {
			queryString = [NSString stringWithFormat:@"%@&pickup[formatted_address]=%@",
						   queryString,
						   fromAddress];
		}
		
		if (toAddress != nil) {
			queryString = [NSString stringWithFormat:@"%@&dropoff[formatted_address]=%@",
						   queryString,
						   toAddress];
		}
		
		if (fromNickname != nil) {
			queryString = [NSString stringWithFormat:@"%@&pickup[nickname]=%@",
						   queryString,
						   fromNickname];
		}
		
		if (toNickname != nil) {
			queryString = [NSString stringWithFormat:@"%@&dropoff[nickname]=%@",
						   queryString,
						   toNickname];
		}
		
		NSString *encodedString = [queryString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
		
		NSLog(@"Uber handle url: %@", encodedString);

		[[UIApplication sharedApplication] openURL:[NSURL URLWithString:encodedString]];
	
	   if (payloadDictionary != nil) {
		   pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
	   } else {
		   pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
		   
		   UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error"
														   message:@"Found an error in the payload. CDVCommandStatus_ERROR!"
														  delegate:self
												 cancelButtonTitle:@"OK"
												 otherButtonTitles:nil];
		   [alert show];
	   }

	   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

    - (void)getAuthenticationToken:(CDVInvokedUrlCommand*)command
    {
        
    }
    @end
