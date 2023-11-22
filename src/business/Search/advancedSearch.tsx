import { Button, Form, Row, Space } from "antd"

interface AdvancedSearchProps {
    onSearch: (values:any) => void
    onReset?: () => void
    getFields: JSX.Element[]
}

// TODO: 高级搜索
export const AdvancedSearch = (props: AdvancedSearchProps) => {
    const [form] = Form.useForm()
    const {
        onSearch, 
        onReset = () => {},
        getFields
    } = props

    const onSearchClick = async () => {
        const res = await form.validateFields()
        onSearch(res)
    }

    const onSearchReset = () => {
        form.resetFields()
        onReset?.()
    }

    return (
        <Form
            form={form}
        >
            <Row gutter={24}>{getFields}</Row>
            <Space>
                <Button type={'primary'} onClick={onSearchClick}>Search</Button>
                <Button onClick={onSearchReset}>Reset</Button>
            </Space>
        </Form>
    )
}