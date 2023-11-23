import { AdvancedSearch, AdvancedSearchProps } from "@/ui/modules/FormSearch/advancedSearch"
import { UISingleSearch, UISingleSearchProps } from "@/ui/modules/Input"
import { DownCircleTwoTone, UpCircleTwoTone } from "@ant-design/icons"
import { Button, Tooltip } from "antd"

import classnames from 'classnames'
import { useState } from "react"

import './index.less'


interface BSSearchProps {
    switchStatus?: boolean
    addNewItems: () => void;
    singleSearch: UISingleSearchProps
    advancedSearch: AdvancedSearchProps
}

export const BSSearch = (props: BSSearchProps) => {
    const {
        switchStatus,
        addNewItems,
        singleSearch,
        advancedSearch
    } = props

    const [searchStatus, setSearchStatus] = useState(switchStatus ?? false)

    const getAdvancedCls = classnames(`advanced-search-container`, {
        [`advanced-hidden`]: !searchStatus
    })
    return (
        <>
            <div className="singleSearch-container">
                <div className="left">
                    <UISingleSearch
                        style={{
                            width: 300
                        }}
                        {...singleSearch}
                        disabled={searchStatus}
                    />
                    <Tooltip title={'点击'}>
                        {searchStatus
                            ? <DownCircleTwoTone style={{ fontSize: 30 }} onClick={() => setSearchStatus(false)} />
                            : <UpCircleTwoTone style={{ fontSize: 30 }} onClick={() => setSearchStatus(true)} />}
                    </Tooltip>
                </div>
                <div className="right">
                    <Button onClick={addNewItems} type={'primary'}>新增</Button>
                </div>
            </div>
            <div className={getAdvancedCls}>
                <AdvancedSearch
                    {...advancedSearch}
                />
            </div>
        </>
    )
}