XTU恰同学少年虚拟实验，联系WX：NULL0001000可代做
import json
import requests
import time
import random
from tkinter import Tk, Label, Entry, Button, messagebox
import pyperclip
import threading
def create_ui():
    global entry
    root = Tk()
    root.title("Wx_NULL0001000")
    root.geometry("280x110")  # Increased height slightly

    Label(root, text="Enter UUID:").pack(pady=5)
    entry = Entry(root, width=25)
    entry.pack(pady=5)
    Button(root, text="Submit", command=start_process).pack(pady=5)

    # Start clipboard monitoring in a separate thread
    monitor_thread = threading.Thread(
        target=monitor_clipboard, args=(entry, root), daemon=True
    )
    monitor_thread.start()

    root.mainloop()


if __name__ == "__main__":
    # Inform the user about the dependency
    try:
        import pyperclip
    except ImportError:
        print(
            "Module 'pyperclip' not found. Please install it using: pip install pyperclip"
        )
        exit()
    create_ui()
