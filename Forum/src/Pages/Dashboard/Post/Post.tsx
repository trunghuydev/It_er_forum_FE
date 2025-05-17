import React, { useState, useEffect } from 'react'
import { Table, Tag, Spin, Input } from 'antd'
import { usePost } from '@/hooks/Post/usePost'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa'
import SidebarMenu from '@/components/SideBar/SideBarMenu'
import Header from '@/components/Header/Header'
import type { ColumnsType } from 'antd/es/table'
import { TPostResponse } from '@/constants'

const { Search } = Input

const Post: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [pendingCount, setPendingCount] = useState(0)
  const navigate = useNavigate()
  const { data, isLoading, isError } = usePost()
  const posts: TPostResponse[] = data?.data || []

  const filteredPosts = posts.filter(
    (post) =>
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const pending = posts.filter((p) => p.status === 'Pending').length
    setPendingCount(pending)
  }, [posts])

  const columns: ColumnsType<TPostResponse> = [
    {
      title: 'Post ID',
      dataIndex: 'post_id',
      key: 'post_id',
      width: '10%',
    },
    {
      title: 'Post Title',
      dataIndex: 'post_title',
      key: 'post_title',
      width: '25%',
      render: (text, record) => (
        <span
          className="text-blue-700 hover:text-blue-500 cursor-pointer truncate block max-w-[250px]"
          onClick={() => navigate(`/post-detail/${record.post_id}`)}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '15%',
    },
    {
      title: 'Have Image',
      dataIndex: 'is_image',
      key: 'is_image',
      width: '10%',
      render: (hasImage) => (hasImage ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />),
    },
    {
      title: 'Date Updated',
      dataIndex: 'date_updated',
      key: 'date_updated',
      width: '15%',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status) => (
        <Tag color={status === 'Pending' ? 'orange' : 'blue'} className="font-bold px-4 py-1 text-center min-w-[6rem]">
          {status}
        </Tag>
      ),
    },
  ]

  return (
    <div className="flex">
      <SidebarMenu />
      <div className="flex-1 bg-gray-100 min-h-screen ml-[17vw] w-[calc(100%-17vw)] pt-40 px-8 relative overflow-auto">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} pendingCount={pendingCount} />

        <div className="p-6 mt-10 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Posts</h2>
            <Search
              placeholder="Search by title or user"
              onSearch={(value) => setSearchTerm(value)}
              enterButton
              style={{ width: 300 }}
              allowClear
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Error loading posts.</p>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredPosts}
              rowKey="post_id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content', y: 500 }}
              locale={{
                emptyText: <span className="italic text-gray-400">No matching results</span>,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
