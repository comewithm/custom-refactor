
export const wrapperEnv = (envConf: Record<string, any>):ViteEnv => {
    const result = {} as ViteEnv
    for(const envName of Object.keys(envConf)) {
        console.log('envName: ', envName)

        let realName = envConf[envName].replace(/\\n/g, "\n")
        realName = ["true", "false"].includes(realName) ? JSON.parse(realName) : realName

        if(envName === 'VITE_PORT') {
            realName = +realName
        }

        if(envName === 'VITE_PROXY') {
            try {
                realName = JSON.parse(realName)
            } catch (error) {
                console.error(error)
            }
        }

        result[envName] = realName
        process.env[envName] = realName
    }
    return result
}