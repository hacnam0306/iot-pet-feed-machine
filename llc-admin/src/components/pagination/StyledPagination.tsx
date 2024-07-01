import { Pagination } from 'antd'
import styled from 'styled-components'

export const StyledPagination = styled((props) => (
  <Pagination {...props} />
))<{}>`
  .ant-pagination-item-link,
  .ant-pagination-item-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
`
