import { PermissionsAndroid } from "react-native";

export const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
            title: "Bluetooth Permission",
            message: "Bluetooth needs to scan for devices",
            buttonPositive: "OK",
        }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
            title: "Bluetooth Permission",
            message: "Bluetooth needs to connect to devices",
            buttonPositive: "OK",
        }
    );
    const bluetoothAdvertisePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        {
            title: "Bluetooth Permission",
            message: "Bluetooth needs to broadcast",
            buttonPositive: "OK",
        }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Bluetooth Location Permission",
            message: "Bluetooth needs location to get device details",
            buttonPositive: "OK",
        }
    );

    return (
        bluetoothScanPermission === "granted" &&
        bluetoothConnectPermission === "granted" &&
        bluetoothAdvertisePermission === "granted" &&
        fineLocationPermission === "granted"
    );
};

export async function requestAndroidNot31Permissions() {

    const bluetoothPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
            title: "Bluetooth Permission",
            message: "Bluetooth needs to connect, scan for devices and transfer data between devices",
            buttonPositive: "OK",
        }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Access fine location required for discovery",
            message:
                "In order to perform discovery, you must enable/allow " +
                "fine location access.",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
        }
    );

    return (
        bluetoothPermission === "granted" &&
        fineLocationPermission === "granted"

    );
}
