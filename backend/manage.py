#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """
    The main entry point for Django's command-line operations (manage.py).
    You typically run commands like 'python manage.py runserver' here.
    """
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Make sure it's installed, or that "
            "your virtual environment is active."
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()