import { getElements } from "@/ui/helper"
import { FormItemMixture } from "@/ui/interface"
import { Button, Col, Form, FormInstance, FormProps, Row, Space } from "antd"

export interface AdvancedSearchProps {
    form: FormInstance<any>
    formProps?: FormProps
    onSearch: (values:any) => void
    onReset?: () => void
    getFields: FormItemMixture[]
}

// TODO: 高级搜索
export const AdvancedSearch = (props: AdvancedSearchProps) => {
    // const [form] = Form.useForm()
    const {
        form,
        formProps,
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
            {...formProps}
            form={form}
        >
            <Row gutter={24}>
                {
                    getFields.map((field, idx) => (
                        <Col key={idx} span={6}>
                            {getElements(field)}
                        </Col>
                    ))
                }
                <Col span={6}>
                    <Space>
                        <Button type={'primary'} onClick={onSearchClick}>Search</Button>
                        <Button onClick={onSearchReset}>Reset</Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    )
}