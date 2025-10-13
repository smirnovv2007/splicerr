use tauri_plugin_keygen_rs2::AppHandleExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let api_url = "https://api.keygen.sh/v1".to_string();
    let account = "7dd25d88-6069-4255-a2d7-aaa513bf0782".to_string();
    let product = "bc6e752c-10e6-43be-b9cd-04a2fa64b583".to_string();
    let public_key = "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxJaZ0va8ozVeUjSCkhqP
OMMoSBt+dZyx03uS/UMYxAGBCYIQC63Bs1/FEX+ri+FdFjCbcx55UaAhQWLWbCmR
pdaiwGkH9EUZ6l+2BSkeGR+zj961TASITpbbP8N9599ywQTRtAM+G35HwXjmgzca
cDbyF1G2EF728WFQdAfndHxAKVYmaxAsze18Z9sOrYfdV0tu/dcMwyKyZE52GJcI
GCwGRmBPxTo5eDgtWOesfgM0d3bneD/M7OgBMMa4gXNZ+w6EKYHJgw0LL7NYNTG2
RBQZf0J/o/ZqrT+BjEkfvgQcAPHUe1n8VZ7ewQb3oY2SPSC4i426GeK9zZn+pSrj
OQIDAQAB
-----END PUBLIC KEY-----".to_string();

    tauri::Builder::default()
        .plugin(
            tauri_plugin_keygen_rs2::Builder::new(account, product, public_key)
                .api_url(api_url)
                .build(),
        )
        .setup(|app| {
            let app_handle = app.handle();

            tauri::async_runtime::block_on(async move {
                let license_state = app_handle.get_license_state();
                let license_state = license_state.lock().await;
                println!("License: {:?}", license_state.license);
                println!("Included: {:?}", license_state.included);

                let machine_state = app_handle.get_machine_state();
                let machine_state = machine_state.lock().await;
                println!("Machine: {:?}", machine_state);

                tauri_plugin_keygen_rs2::add_license_listener(|state| {
                    println!("License state change: {:?}", state);
                })
                .await;
            });
            Ok(())
        })
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_drag::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
