import { ApiResponse } from "@/api/interface"
import { useEffect, useState } from "react"

type noopPromise = (...args: any[]) => Promise<any>

type GetReturnType<T extends noopPromise> = T extends (...args:any[]) => Promise<ApiResponse<infer R>> ? R : unknown

export const useTableList = <T extends any = any, F extends noopPromise = noopPromise>(params: T, request: F) => {
    // 分页接口数据请求

    const [tableData, setTableData] = useState({} as GetReturnType<F>)
    const [tableParams, setTableParams] = useState(params)

    const fetchData = async () => {
        const {data} = await request(tableParams)

        setTableData(data)
    }

    useEffect(() => {
        fetchData()
    }, [tableParams])
    return {
        tableParams,
        setTableParams,
        tableData,
        fetchData
    }
}