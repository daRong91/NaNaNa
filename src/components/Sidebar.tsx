import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu
type itemType = string | { [key: string]: string[] }
interface DirectoryType {
  [key: string]: Array<itemType>
}
interface AppSidebarType {
  setCurrentItem: Function
  refreshSideBarCount: number
  currentItemPath: string
}
const AppSidebar: React.FC<AppSidebarType> = ({ currentItemPath, setCurrentItem, refreshSideBarCount }) => {
  const [fileDirs, setFileDirs] = useState({})
  useEffect(() => {
    axios
      .get(`./api/files`)
      .then((res) => {
        setFileDirs(res.data)
      })
      .catch((err) => {})
  }, [refreshSideBarCount])
  useEffect(() => {
    if (Object.keys(fileDirs).length > 0) {
      setCurrentItem(currentItemPath || `${Object.keys(fileDirs)[0]}/${Object.values(fileDirs as DirectoryType)[0][0]}`)
    }
  }, [currentItemPath, fileDirs, setCurrentItem])
  return (
    <Sider width={300} className="site-layout-background">
      {Object.keys(fileDirs).length && (
        <Menu mode="inline" selectedKeys={[currentItemPath.split('/')[1]]} style={{ height: '100%', borderRight: 0 }}>
          {Object.keys(fileDirs).map((dirName: string) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              {(fileDirs as DirectoryType)[dirName].map((fileName: itemType) =>
                typeof fileName === 'string' ? (
                  <Menu.Item
                    key={fileName}
                    title={fileName}
                    onClick={(): void => {
                      setCurrentItem(`${dirName}/${fileName}`)
                    }}
                  >
                    {fileName.split('.')[0]}
                  </Menu.Item>
                ) : (
                  Object.keys(fileName).map((innerDirName) => (
                    <SubMenu key={innerDirName} title={innerDirName}>
                      {fileName[innerDirName].map((innerFileName: string) => (
                        <Menu.Item
                          key={innerFileName}
                          onClick={(): void => {
                            setCurrentItem(`${dirName}/${innerDirName}/${innerFileName}`)
                          }}
                        >
                          {innerFileName}
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ))
                )
              )}
            </SubMenu>
          ))}
        </Menu>
      )}
    </Sider>
  )
}
export default AppSidebar