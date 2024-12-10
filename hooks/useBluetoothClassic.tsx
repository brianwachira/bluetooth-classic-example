import { useEffect, useState } from "react";
import RNBluetoothClassic, {
	BluetoothDevice,
	BluetoothDeviceEvent,
} from "react-native-bluetooth-classic";
import * as ExpoDevice from "expo-device";
import { Platform } from "react-native";
import { requestAndroid31Permissions, requestAndroidNot31Permissions } from "@/utils/helpers";



export const useBluetoothClassic = () => {
	const [isAcceptingConnections, setIsAcceptingConnections] = useState(false);
	const [connectedDevice, setConnectedDevice] =
	useState<BluetoothDevice | null>(null);
    
	useEffect(() => {
		let subscription = RNBluetoothClassic.onDeviceDisconnected(
			(event: BluetoothDeviceEvent) => {
				console.log(event.eventType)
				if(event.eventType === "DEVICE_DISCONNECTED") {
					setConnectedDevice(null)
				}
			})
		return () => {
			subscription?.remove()
		}
	},[connectedDevice])

	const requestPermissions = async () => {
		if (Platform.OS === "android") {
			if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
				console.log("running platform apilevel < 31");
				const granted = await requestAndroidNot31Permissions();
				return granted;
			} else {
				console.log("running platform apilevel > 31");
				const isAndroid31PermissionsGranted =
					await requestAndroid31Permissions();

				return isAndroid31PermissionsGranted;
			}
		} else {
			return true;
		}
	};

	const enableBluetooth = async () => {
		try {
			await RNBluetoothClassic.requestBluetoothEnabled();
			console.log("Bluetooth is enabled");
		} catch (error) {
			console.log("User refused to enable Bluetooth", error);
			return false;
		}
		return true;
	};
	const acceptConnections = async () => {
		if (isAcceptingConnections === false) {
			setIsAcceptingConnections(true);
			try {
				await RNBluetoothClassic.cancelAccept();
				const device = await RNBluetoothClassic.accept({
					delimiter: "",
					DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8",
					READ_SIZE: 800000,
				});
				if (device) {
					setConnectedDevice(device);
					setIsAcceptingConnections(false);
				}
			} catch (error) {
				console.error("Failed to connect to device:", error);
			}
		}
	};


	   const cancelAcceptConnections = async () => {
		try {
			const cancelAcceptConnectionStatus =
				await RNBluetoothClassic.cancelAccept();
			setIsAcceptingConnections(false);
			return cancelAcceptConnectionStatus;
		} catch (error) {
			console.error("Failed to connect to device:", error);
		}
	};

	return {
		isAcceptingConnections,
		connectedDevice,
		enableBluetooth,
		acceptConnections: acceptConnections,
		cancelAcceptConnections: cancelAcceptConnections,
		requestPermissions,
	}
}

export default useBluetoothClassic;