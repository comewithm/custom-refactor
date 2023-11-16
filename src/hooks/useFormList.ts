import { ApiResponse } from "@/api/interface"
import { useEffect, useState } from "react"

type noop = (...args: any[]) => any

type noopPromise = (...args: any[]) => Promise<any>

type GetReturnType<T extends noop> = T extends Promise<ApiResponse<infer R>> ? R : any

export const useTableList = <T extends any = any, F extends noopPromise = noopPromise>(params: T, request: F) => {
    // 分页接口数据请求

    const [tableData, setTableData] = useState<GetReturnType<F>>()
    const [tableParams, setTableParams] = useState(params)

    const fetchData = async () => {
        const {data} = await request(params)

        setTableData(data)
    }

    useEffect(() => {
        fetchData()
    }, [tableParams])
    return {
        tableParams,
        setTableParams,
        tableData
    }
}