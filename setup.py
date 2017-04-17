# -*- coding: utf-8 -*-
"""Installer for the example.rapidoplone package."""

from setuptools import find_packages
from setuptools import setup


long_description = (
    open('README.rst').read()
    + '\n' +
    'Contributors\n'
    '============\n'
    + '\n' +
    open('docs/CONTRIBUTORS.rst').read()
    + '\n' +
    open('docs/CHANGES.rst').read()
    + '\n')


setup(
    name='example.rapidoplone',
    version='0.1',
    description="Example package that shows how to Hacking with rapido.plone applications in the Theme",
    long_description=long_description,
    # Get more from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: 5.0"
        "Framework :: Plone :: 5.1"
        "Framework :: Plone :: Theme"
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.7",
    ],
    keywords='Python Plone',
    author='Eric BREHAULT',
    author_email='software@pretaweb.com',
    maintainer='Leonardo J. Caballero G.',
    maintainer_email='leonardocaballero@gmail.com',
    url='https://github.com/collective/example.rapidoplone',
    license='GPL',
    packages=find_packages('.', exclude=['ez_setup']),
    namespace_packages=['example'],
    package_dir={'': '.'},
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
        'rapido.plone'
    ],
    extras_require={
        'test': [
            'plone.app.testing',
            'plone.app.contenttypes',
            'plone.app.robotframework[debug]',
        ],
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    """,
)
