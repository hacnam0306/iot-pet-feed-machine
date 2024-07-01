import { Pagination, PaginationProps, Table, TableProps } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import styled from 'styled-components'

import { themes } from '@theme'

interface ITableProps {
  columns: ColumnsType<any>
  dataSource: any
  key?: number | string
  rowKey?: any
  paginationProps?: PaginationProps
  onRowClick?: (record: any) => void
  sticky?: boolean
}

export const SharedTable = ({
  columns,
  dataSource,
  key,
  rowKey,
  paginationProps,
  onRowClick,
  sticky,
}: ITableProps) => {
  const handleRowClick = (record: any) => {
    if (onRowClick) {
      onRowClick(record)
    }
  }
  return (
    <StyledTableWrapper $appTheme={themes.theme.light.colors.primary}>
      <Table
        className="bg-gray-100 md:ml-3 mt-3"
        key={key}
        rowKey={rowKey}
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClick(record),
          }
        }}
        sticky={sticky}
      />
      <div className="flex justify-end mt-3 px-[0.5rem]">
        {paginationProps?.total && <Pagination {...paginationProps} />}
      </div>
    </StyledTableWrapper>
  )
}

const StyledTableWrapper = styled.div<{
  $appTheme: string
}>`
  .ant-table-tbody > tr:hover {
    cursor: pointer;
  }

  .ant-pagination-item-active a {
    border-color: ${(p) => p.$appTheme};
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: ${(p) => p.$appTheme};
    a {
      color: ${(p) => p.$appTheme};
    }
  }

  .ant-table-thead > tr > th {
    position: relative;
    color: white;
    font-weight: 500;
    text-align: left;
    background: ${(p) => p.$appTheme};
    border-bottom: 2px solid #f0f0f0;
    transition: background 0.3s ease;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
  .ant-table-tbody > tr > td {
    transition: background 0.3s;
    text-align: left;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
  .ant-table-wrapper {
    overflow: auto;
    width: 100%;
    max-height: 63vh;
  }
  .ant-table-wrapper .ant-table {
    width: 100%;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    width: auto;
    white-space: nowrap;
  }
  .ant-table-content > table {
    width: 100%;
    border-left: 2px solid #f0f0f0;
  }
  .ant-table-content {
    margin-right: 1.25rem;
  }

  .ant-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-pagination-prev {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover,
      &:focus-visible {
        .ant-pagination-item-link {
          border-color: ${(p) => p.$appTheme};
          color: ${(p) => p.$appTheme};
        }
      }
    }
    .ant-pagination-next {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover,
      &:focus-visible {
        .ant-pagination-item-link {
          border-color: ${(p) => p.$appTheme};
          color: ${(p) => p.$appTheme};
        }
      }
    }

    .ant-pagination-disabled {
      .ant-pagination-item-link {
        color: rgba(0, 0, 0, 0.25);
        border-color: #d9d9d9;
        cursor: not-allowed;
      }

      &:hover {
        .ant-pagination-item-link {
          color: rgba(0, 0, 0, 0.25);
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      }
    }

    .ant-pagination-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-pagination-item:hover {
      border-color: ${(p) => p.$appTheme};
      a {
        color: ${(p) => p.$appTheme};
      }
    }

    .ant-table-thead
      > tr
      > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan]):before {
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 1.6em;
      background-color: white !important;
      transform: translateY(-50%);
      transition: background-color 0.3s;
      content: '';
    }
  }
`
