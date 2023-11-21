import { Col, Form, Input, Row } from "antd"

interface AdvancedSearchProps {
    fields: any[]
}
// TODO: 高级搜索
export const AdvancedSearch = (props: AdvancedSearchProps) => {
    const {fields} = props
    const [form] = Form.useForm()

    const getFields = () => {

        return (
            <Col span={8}>
                <Form.Item
                    name={'name'}
                    label={'label'}
                    rules={[{required: true, message: 'input...'}]}
                >
                    <Input placeholder={'placeholder'} />
                </Form.Item>
            </Col>
        )
    }

    return (
        <Form
            form={form}
        >
            <Row gutter={24}>{getFields()}</Row>
        </Form>
    )
}