import useBluetoothClassic from "@/hooks/useBluetoothClassic";
import { useEffect } from "react";
import { View } from "react-native";

const Bluetooth = () => {
	const {
		isAcceptingConnections,
		connectedDevice,
		enableBluetooth,
		acceptConnections,
		cancelAcceptConnections,
		requestPermissions,
	} = useBluetoothClassic();

	const _acceptConnections = async () => {
		const isPermissionsEnabled = await requestPermissions();
		console.log("isPermissionsEnabled", isPermissionsEnabled);

		if (isPermissionsEnabled) {
			const bluetoothEnabled = await enableBluetooth();

			if (bluetoothEnabled) {
				console.log("Accepting connections");
				acceptConnections();
			}
		} else {
			console.log("Location not enabled");
			await requestPermissions();
		}
	};


    
	useEffect(() => {
		_acceptConnections();
	}, []);

    return ( 
    
    <View style={{flex: 1}}>
        
    </View> 
)
};

export default Bluetooth;