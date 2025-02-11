import os

def print_dir_structure(path, indent=0):
    """
    打印文件夹层次结构
    :param path: 文件夹路径
    :param indent: 缩进级别
    """
    # 获取当前文件夹下的所有文件和文件夹
    items = os.listdir(path)
    
    for item in items:
        # 拼接完整的相对路径
        item_path = os.path.join(path, item)
        
        # 判断是文件还是文件夹
        if os.path.isdir(item_path):
            # 如果是文件夹，打印文件夹名并递归打印其内容
            print('  ' * indent + item + '/')
            print_dir_structure(item_path, indent + 1)
        else:
            # 如果是文件，直接打印文件名
            print('  ' * indent + item)

target_folder = r'C:\Users\user\Desktop\抽奖游戏'
print(target_folder + '/')
print_dir_structure(target_folder)