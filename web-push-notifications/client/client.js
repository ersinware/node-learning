// Check for service worker
// if ('serviceWorker' in navigator) {
//
// }

let pushSubscription;

// register service worker
navigator.serviceWorker
	.register("./worker.js", { scope: "/" })
	.then(async (registration) => {
		await navigator.serviceWorker.ready;
		const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

		// register push
		return await registraation.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		});
	})
	.then((_pushSubscription) => (pushSubscription = _pushSubscription))
	.then(() => console.log("push notification configured"))
	.catch((error) => console.error(error));

document.getElementById("btnSend").onclick = () => {
	// subscribe
	fetch("/sendNotification", {
		method: "POST",
		body: JSON.stringify(pushSubscription),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((response) => {
			if (response.ok) console.log("notification should be sent");
		})
		.catch((error) => console.error(error));
};

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4),
		base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/"),
		rawData = window.atob(base64),
		outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);

	return outputArray;
}
